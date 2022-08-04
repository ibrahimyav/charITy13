import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { EventDateAttendeesPage } from '../event-date-attendees/event-date-attendees';
import { ScanningPage } from '../scanning/scanning';

@IonicPage()
@Component({
  selector: 'page-event-date-details',
  templateUrl: 'event-date-details.html',
})

export class EventDateDetailsPage {

  public eventDate: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public globalFunctionsProvider: GlobalFunctionsProvider
    ) {
      this.eventDate = navParams.get("eventDate");
  }

  ionViewDidLoad() {}

  eventDateAttendees(eventDate) {
    this.navCtrl.push(EventDateAttendeesPage, { "eventDate": eventDate });
  }

  scanQrCodes(eventDate) {
    this.navCtrl.push(ScanningPage, { "eventDate": eventDate });
  }

}