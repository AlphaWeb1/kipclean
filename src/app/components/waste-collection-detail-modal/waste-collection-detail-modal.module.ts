import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WasteCollectionDetailModalComponent } from './waste-collection-detail-modal.component';



@NgModule({
  declarations: [
    WasteCollectionDetailModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    WasteCollectionDetailModalComponent
  ]
})
export class WasteCollectionDetailModalModule { }
