import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, Events } from 'ionic-angular';

/*
  Generated class for the GlobalFunctionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalFunctionsProvider {

  currentLang: string;
  apiKey: string;
  scannerName: string;
  username: string;
  organizerName: string;
  organizerLogo: string;
  showEventDateStats: string;
  allowTapToCheckIn: string;
  eventDatesArray: string;

  constructor(public storage: Storage,
    public translate: TranslateService,
    public alertCtrl: AlertController,
    events: Events) {
    this.setCurrentLang();
    this.updateScannerInformation();
    events.subscribe('SCANNER_INFORMATION_RECEIVED', (data) => {
      this.updateScannerInformation();
    });
  }

  async setCurrentLang() {
    this.storage.ready().then(() => {
      this.storage.get('language').then((lang) => {
        if (lang) {
          this.currentLang = lang;
        } else {
          this.currentLang = this.translate.getDefaultLang();
        }
      });
    });
  }

  getCurrentLang(): string {
    return this.currentLang;
  }

  getApiKey() {
    return this.apiKey;
  }

  getScannerName() {
    return this.scannerName;
  }

  getUsername() {
    return this.username;
  }

  getOrganizerName() {
    return this.organizerName;
  }

  getOrganizerLogo() {
    return this.organizerLogo;
  }

  getShowEventDateStats() {
    return this.showEventDateStats;
  }

  getAllowTapToCheckIn() {
    return this.allowTapToCheckIn;
  }

  getEventDatesArray() {
    return JSON.parse(this.eventDatesArray);
  }

  showErrorAlert(errorAlertMessage = null) {

    let errorAlertTitle;
    let errorAlertButtonText;


    this.translate.get('Error').subscribe(
      value => {
        errorAlertTitle = value;
      }
    )
    if (errorAlertMessage == null) {
      this.translate.get('An error occurred while processing your request').subscribe(
        value => {
          errorAlertMessage = value;
        }
      )
    }
    this.translate.get('Ok').subscribe(
      value => {
        errorAlertButtonText = value;
      }
    )

    let alert = this.alertCtrl.create({
      title: errorAlertTitle,
      cssClass: 'alert-danger',
      enableBackdropDismiss: false,
      subTitle: errorAlertMessage,
      buttons: [errorAlertButtonText]
    });
    alert.present();
  }

  showAlert(title: string, message: string) {

    let alertButtonText;

    this.translate.get('Ok').subscribe(
      value => {
        alertButtonText = value;
      }
    )

    let alert = this.alertCtrl.create({
      title: title,
      cssClass: 'alert-danger',
      enableBackdropDismiss: false,
      subTitle: message,
      buttons: [alertButtonText]
    });
    alert.present();
  }

  updateScannerInformation() {
    this.storage.ready().then(() => {
      this.storage.get('apiKey').then((apiKey) => {
        this.apiKey = apiKey;
      });
      this.storage.get('scannerName').then((scannerName) => {
        this.scannerName = scannerName;
      });
      this.storage.get('username').then((username) => {
        this.username = username;
      });
      this.storage.get('organizerName').then((organizerName) => {
        this.organizerName = organizerName;
      });
      this.storage.get('organizerLogo').then((organizerLogo) => {
        this.organizerLogo = organizerLogo;
      });
      this.storage.get('showEventDateStats').then((showEventDateStats) => {
        this.showEventDateStats = showEventDateStats;
      });
      this.storage.get('allowTapToCheckIn').then((allowTapToCheckIn) => {
        this.allowTapToCheckIn = allowTapToCheckIn;
      });
      this.storage.get('eventDatesArray').then((eventDatesArray) => {
        this.eventDatesArray = eventDatesArray;
      });
    });
  }

}
