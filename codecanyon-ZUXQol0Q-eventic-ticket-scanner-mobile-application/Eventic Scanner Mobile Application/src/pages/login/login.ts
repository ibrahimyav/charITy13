import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { ParametersProvider } from '../../providers/parameters/parameters';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { LoginProvider } from '../../providers/login/login';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { EventDatesPage } from '../event-dates/event-dates';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    username: string;
    password: string;
    language: string;
    languages;
    languagesForLoop;

    constructor(public platform: Platform,
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public parametersProvider: ParametersProvider,
        public globalFunctions: GlobalFunctionsProvider,
        public loginProvider: LoginProvider,
        public storage: Storage,
        public translate: TranslateService,
        public loading: LoadingController,
        public events: Events) {
        storage.ready().then(() => {
            storage.get('language').then((language) => {
                if (language == "" || language == null) {
                    translate.use("en");
                    this.language = "en";
                    platform.setDir("ltr", true);
                } else {
                    translate.use(language);
                    this.language = language;
                    if (language == "ar") {
                        platform.setDir("rtl", true);
                    } else {
                        platform.setDir("ltr", true);
                    }
                }
            });
        });
    }

    ionViewDidLoad() {
        this.languages = this.parametersProvider.getLanguages();
        this.languagesForLoop = Object.keys(this.parametersProvider.getLanguages());
    }

    onLanguageChange($event) {
        this.storage.set('language', this.language);
        this.globalFunctions.setCurrentLang();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

    login() {

        let loginAlertTitle;
        let loginAlertMessage;
        let loginAlertButtonText;
        let loadingDialogTitle;

        this.translate.get('Wrong credentials').subscribe(
            value => {
                loginAlertTitle = value;
            }
        )
        this.translate.get('Enter the username and the password of the scanner account').subscribe(
            value => {
                loginAlertMessage = value;
            }
        )
        this.translate.get('Loading ...').subscribe(
            value => {
                loadingDialogTitle = value;
            }
        )
        this.translate.get('Ok').subscribe(
            value => {
                loginAlertButtonText = value;
            }
        )

        if (!this.username || !this.password) {
            let alert = this.alertCtrl.create({
                title: loginAlertTitle,
                cssClass: 'alert-danger',
                enableBackdropDismiss: false,
                subTitle: loginAlertMessage,
                buttons: [loginAlertButtonText]
            });
            alert.present();
        } else {

            let loader = this.loading.create({
                content: loadingDialogTitle,
            });

            loader.present().then(() => {
                this.loginProvider.authenticate(this.username, this.password).subscribe(loginProviderResult => {
                    loader.dismiss();
                    if (loginProviderResult["type"] == "error") {
                        this.globalFunctions.showErrorAlert(loginProviderResult["message"]);
                    } else {
                        this.storage.set("apiKey", loginProviderResult["apiKey"]);
                        this.storage.set("scannerName", loginProviderResult["scannerName"]);
                        this.storage.set("username", loginProviderResult["username"]);
                        this.storage.set("organizerName", loginProviderResult["organizerName"]);
                        this.storage.set("organizerLogo", loginProviderResult["organizerLogo"]);
                        this.storage.set("showEventDateStats", loginProviderResult["showEventDateStats"]);
                        this.storage.set("allowTapToCheckIn", loginProviderResult["allowTapToCheckIn"]);
                        this.storage.set("eventDatesArray", JSON.stringify(loginProviderResult["eventDatesArray"]));
                        this.events.publish("SCANNER_INFORMATION_RECEIVED");
                        this.navCtrl.setRoot(EventDatesPage);
                    }
                }, (err) => {
                    loader.dismiss();
                    this.globalFunctions.showErrorAlert();
                });
            });
        }
    }
}