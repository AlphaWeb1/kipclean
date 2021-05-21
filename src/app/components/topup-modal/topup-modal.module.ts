import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TopupModalComponent } from './topup-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  entryComponents: [],
  declarations: [
    TopupModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    TopupModalComponent
  ]
})
export class TopupModalModule { }
