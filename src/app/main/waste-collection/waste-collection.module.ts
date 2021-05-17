import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteCollectionPageRoutingModule } from './waste-collection-routing.module';

import { WasteCollectionPage } from './waste-collection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteCollectionPageRoutingModule
  ],
  declarations: [WasteCollectionPage]
})
export class WasteCollectionPageModule {}
