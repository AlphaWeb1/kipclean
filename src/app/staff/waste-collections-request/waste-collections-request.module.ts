import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteCollectionsRequestPageRoutingModule } from './waste-collections-request-routing.module';

import { WasteCollectionsRequestPage } from './waste-collections-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteCollectionsRequestPageRoutingModule
  ],
  declarations: [WasteCollectionsRequestPage]
})
export class WasteCollectionsRequestPageModule {}
