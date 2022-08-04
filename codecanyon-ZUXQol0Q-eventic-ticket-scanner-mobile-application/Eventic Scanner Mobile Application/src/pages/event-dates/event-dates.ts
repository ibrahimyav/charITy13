import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { EventDateDetailsPage } from '../event-date-details/event-date-details';

@IonicPage()
@Component({
  selector: 'page-event-dates',
  templateUrl: 'event-dates.html',
})

export class EventDatesPage {

  public eventDates: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public globalFunctionsProvider: GlobalFunctionsProvider,
    public loading: LoadingController, ) {
    this.eventDates = this.globalFunctionsProvider.getEventDatesArray();
  }

  ionViewDidLoad() { }

  eventDateDetails(eventDate) {
    this.navCtrl.push(EventDateDetailsPage, { "eventDate": eventDate });
  }

}
