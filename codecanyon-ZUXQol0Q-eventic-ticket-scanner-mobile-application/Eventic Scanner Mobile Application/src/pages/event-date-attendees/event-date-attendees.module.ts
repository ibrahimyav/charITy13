import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDateAttendeesPage } from './event-date-attendees';
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EventDateAttendeesPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDateAttendeesPage),
    ReactiveFormsModule,
    TranslateModule
  ],
})
export class EventDateAttendeesPageModule {}
