import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { EventDatesPage } from '../pages/event-dates/event-dates';
import { GlobalFunctionsProvider } from '../providers/global-functions/global-functions';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  appMenuItems: Array<MenuItem>;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translate: TranslateService,
    config: Config,
    public storage: Storage,
    public globalFunctionsProvider: GlobalFunctionsProvider) {

    let eventsMenuItemTitle;
    let logoutMenuItemTitle;

    translate.get('Events').subscribe(
      value => {
        eventsMenuItemTitle = value;
      }
    )

    translate.get('Logout').subscribe(
      value => {
        logoutMenuItemTitle = value;
      }
    )

    this.appMenuItems = [
      { title: eventsMenuItemTitle, component: EventDatesPage, icon: 'calendar' },
      { title: logoutMenuItemTitle, component: LoginPage, icon: 'log-out' }
    ];

    platform.ready().then(() => {
      translate.setDefaultLang('en');
      storage.ready().then(() => {
        storage.get('language').then((language) => {
          if (language == "" || language == null) {
            translate.use("en");
            platform.setDir("ltr", true);
          } else {
            translate.use(language);
            if (language == "ar") {
              platform.setDir("rtl", true);
            } else {
              platform.setDir("ltr", true);
            }
          }
          translate.get('Back').subscribe(
            value => {
              console.log(value);
              config.set('ios', 'backButtonText', value);
            }
          )
        });
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

