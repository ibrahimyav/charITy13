import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanningPage } from './scanning';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ScanningPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanningPage),
    TranslateModule
  ],
})
export class ScanningPageModule {}
