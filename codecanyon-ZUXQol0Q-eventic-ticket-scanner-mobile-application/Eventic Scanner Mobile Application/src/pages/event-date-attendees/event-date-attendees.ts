import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { EventDateAttendeesProvider } from '../../providers/event-date-attendees/event-date-attendees';
import { GlobalFunctionsProvider } from '../../providers/global-functions/global-functions';
import { GrantAccessProvider } from '../../providers/grant-access/grant-access';
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@IonicPage()
@Component({
  selector: 'page-event-date-attendees',
  templateUrl: 'event-date-attendees.html',
})
export class EventDateAttendeesPage {

  public eventDate;
  public attendees: any = [];
  public filteredAttendeesList: any = [];
  public searchControl: FormControl;
  public searching: any = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public eventDateAttendeesProvider: EventDateAttendeesProvider,
    public grantAccessProvider: GrantAccessProvider,
    public globalFunctions: GlobalFunctionsProvider) {

    this.searchControl = new FormControl();
    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(searchTearm => {
        this.searching = false;
        this.filterAttendees(searchTearm);
      });

    this.eventDate = navParams.get('eventDate');

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
      this.eventDateAttendeesProvider.getAttendees(this.eventDate.eventDateReference).subscribe(eventDateAttendeesProviderResult => {
        loader.dismiss();
        if (eventDateAttendeesProviderResult["type"] == "error") {
          this.globalFunctions.showErrorAlert(eventDateAttendeesProviderResult["message"]);
        } else {
          this.attendees = eventDateAttendeesProviderResult;
          this.filterAttendees("");
        }
      }, (err) => {
        loader.dismiss();
        this.globalFunctions.showErrorAlert();
      });
    });

  }

  filterAttendees(searchTerm) {
    this.filteredAttendeesList = this.attendees.filter(attendee => {
      return attendee.attendeeName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  onSearchInput() {
    this.searching = true;
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
          this.globalFunctions.showErrorAlert(grantAccessProviderResult["message"]);
        } else {
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
            buttons: [accessGrantedButtonText]
          });
          alert.present();
        }
        for (var i = 0; i < this.attendees.length; i++) {
          if (this.attendees[i].ticketReference === ticketReference) {
            this.attendees[i].isTicketScanned = true;
            return;
          }
        }
      }, (err) => {
        loader.dismiss();
        this.globalFunctions.showErrorAlert();
      });
    });
    
    
  }

  ionViewDidLoad() { }

}
