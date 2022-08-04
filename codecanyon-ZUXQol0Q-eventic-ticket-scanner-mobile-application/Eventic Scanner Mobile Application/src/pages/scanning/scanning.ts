import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { NativeAudio } from '@ionic-native/native-audio';
import { GrantAccessProvider } from '../../providers/grant-access/grant-access';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-scanning',
  templateUrl: 'scanning.html',
})
export class ScanningPage {

  public usedCamera: string;
  public lightEnabled: boolean;
  public eventDate;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public qrScanner: QRScanner,
    private alertCtrl: AlertController,
    public loading: LoadingController,
    public grantAccessProvider: GrantAccessProvider,
    public globalFunctions: GlobalFunctionsProvider,
    public translate: TranslateService,
    private nativeAudio: NativeAudio) {
    this.eventDate = navParams.get('eventDate');
  }

  ionViewDidLoad() {
    this.scan();
    this.usedCamera = "back";
    this.lightEnabled = false;
    this.nativeAudio.preloadComplex('successSound', 'assets/audio/success.mp3', 1, 1, 0).then();
    this.nativeAudio.preloadComplex('errorSound', 'assets/audio/failure.mp3', 1, 1, 0).then();
  }

  ionViewWillLeave() {
    this.qrScanner.destroy();
  }

  toggleLight() {
    if (this.lightEnabled == false) {
      this.qrScanner.enableLight();
      this.lightEnabled = true;
    }
    else {
      this.qrScanner.disableLight();
      this.lightEnabled = false;
    }
  }

  switchCamera() {
    if (this.usedCamera == "back") {
      this.qrScanner.useFrontCamera();
      this.usedCamera = "front";
    }
    else {
      this.qrScanner.useBackCamera();
      this.usedCamera = "back";
    }
  }

  scan() {
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        let scanSub = this.qrScanner.scan().subscribe((ticketReference: string) => {
          this.grantAccess(ticketReference);
          this.qrScanner.hide();
          scanSub.unsubscribe();
          this.qrScanner.pausePreview();
        });

        this.qrScanner.show();
      } else {
        let cameraPermissionNotGranted;
        this.translate.get('The camera permission was not granted').subscribe(
          value => {
            cameraPermissionNotGranted = value;
          }
        )
        this.globalFunctions.showErrorAlert(cameraPermissionNotGranted);
      }
    })
      .catch((e: any) => {
        this.globalFunctions.showErrorAlert(e);
      });
  }

  grantAccess(ticketReference) {
    let loadingDialogTitle;
    this.translate.get('Loading ...').subscribe(
      value => {
        loadingDialogTitle = value;
      }
    )
    let loader = this.loading.create({
      content: loadingDialogTitle,
    });

    loader.present().then(() => {
      this.grantAccessProvider.scanTicket(this.eventDate.eventDateReference, ticketReference).subscribe(grantAccessProviderResult => {
        loader.dismiss();
        if (grantAccessProviderResult["type"] == "error") {
          this.nativeAudio.play('errorSound').then();

          let accessNotGrantedAlertTitle;
          let accessNotGrantedButtonText;
          this.translate.get('Access not granted').subscribe(
            value => {
              accessNotGrantedAlertTitle = value;
            }
          )
          this.translate.get('Next').subscribe(
            value => {
              accessNotGrantedButtonText = value;
            }
          )
          let alert = this.alertCtrl.create({
            title: accessNotGrantedAlertTitle,
            cssClass: 'alert-danger',
            enableBackdropDismiss: false,
            subTitle: grantAccessProviderResult["message"],
            buttons: [
              {
                text: accessNotGrantedButtonText,
                handler: () => {
                  this.scan();
                }
              }
            ]
          });
          alert.present();
        } else {
          this.nativeAudio.play('successSound').then();
          let accessGrantedAlertTitle;
          let accessGrantedButtonText;
          this.translate.get('Access granted').subscribe(
            value => {
              accessGrantedAlertTitle = value;
            }
          )
          this.translate.get('Next').subscribe(
            value => {
              accessGrantedButtonText = value;
            }
          )
          let alert = this.alertCtrl.create({
            title: accessGrantedAlertTitle,
            cssClass: 'alert-success',
            enableBackdropDismiss: false,
            subTitle: ' ',
            buttons: [
              {
                text: accessGrantedButtonText,
                handler: () => {
                  this.scan();
                }
              }
            ]
          });
          alert.present();
        }
      }, (err) => {
        loader.dismiss();
        let grantAccessErrorAlertTitle;
        let grantAccessErrorButtonText;
        let grantAccessErrorSubtitleText;
        this.translate.get('Error').subscribe(
          value => {
            grantAccessErrorAlertTitle = value;
          }
        )
        this.translate.get('Next').subscribe(
          value => {
            grantAccessErrorButtonText = value;
          }
        )
        this.translate.get('Next').subscribe(
          value => {
            grantAccessErrorSubtitleText = value;
          }
        )
        let alert = this.alertCtrl.create({
          title: grantAccessErrorAlertTitle,
          cssClass: 'alert-danger',
          enableBackdropDismiss: false,
          subTitle: grantAccessErrorSubtitleText,
          buttons: [
            {
              text: grantAccessErrorButtonText,
              handler: () => {
                this.scan();
              }
            }
          ]
        });
        alert.present();
      });
    });
  }

}
