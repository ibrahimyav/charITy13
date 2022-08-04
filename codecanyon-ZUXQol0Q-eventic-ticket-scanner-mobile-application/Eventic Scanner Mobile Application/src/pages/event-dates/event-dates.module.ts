import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDatesPage } from './event-dates';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EventDatesPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDatesPage),
    TranslateModule
  ],
})
export class EventsPageModule {}
