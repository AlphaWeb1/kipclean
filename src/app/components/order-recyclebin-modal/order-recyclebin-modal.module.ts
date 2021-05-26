import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OrderRecyclebinModalComponent } from './order-recyclebin-modal.component';

@NgModule({
  declarations: [
    OrderRecyclebinModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    OrderRecyclebinModalComponent
  ]
})
export class OrderRecyclebinModalModule { }
