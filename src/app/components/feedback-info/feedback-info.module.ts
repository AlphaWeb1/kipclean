import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeedbackInfoComponent } from './feedback-info.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    FeedbackInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    FeedbackInfoComponent
  ]
})
export class FeedbackInfoModule { }
