import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { EventDatesPage } from '../pages/event-dates/event-dates';
import { EventsPageModule } from '../pages/event-dates/event-dates.module';
import { EventDateDetailsPage } from '../pages/event-date-details/event-date-details';
import { EventDateDetailsPageModule } from '../pages/event-date-details/event-date-details.module';
import { EventDateAttendeesPage } from '../pages/event-date-attendees/event-date-attendees';
import { EventDateAttendeesPageModule } from '../pages/event-date-attendees/event-date-attendees.module';
import { ParametersProvider } from '../providers/parameters/parameters';
import { LoginProvider } from '../providers/login/login';
import { GlobalFunctionsProvider } from '../providers/global-functions/global-functions';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EventDateAttendeesProvider } from '../providers/event-date-attendees/event-date-attendees';
import { GrantAccessProvider } from '../providers/grant-access/grant-access';
import { NativeAudio } from "@ionic-native/native-audio";
import { QRScanner } from "@ionic-native/qr-scanner";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { ScanningPage } from '../pages/scanning/scanning';
import { ScanningPageModule } from '../pages/scanning/scanning.module';

export function HttpLoaderFactory(http: HttpClient) {
return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgCircleProgressModule.forRoot(),
        LoginPageModule,
        EventDateAttendeesPageModule,
        EventDateDetailsPageModule,
        EventsPageModule,
        ScanningPageModule
  ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        EventDatesPage,
        EventDateDetailsPage,
        EventDateAttendeesPage,
        ScanningPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ParametersProvider,
    LoginProvider,
    GlobalFunctionsProvider,
    EventDateAttendeesProvider,
    GrantAccessProvider,
    NativeAudio,
    QRScanner,
    AndroidPermissions    ]
})
export class AppModule {}

