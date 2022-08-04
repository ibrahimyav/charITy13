import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDateDetailsPage } from './event-date-details';
import { TranslateModule } from '@ngx-translate/core';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    EventDateDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDateDetailsPage),
    TranslateModule,
    NgCircleProgressModule
  ],
})
export class EventDateDetailsPageModule {}
