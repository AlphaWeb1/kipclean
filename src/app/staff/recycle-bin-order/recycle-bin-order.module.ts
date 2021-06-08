import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecycleBinOrderPageRoutingModule } from './recycle-bin-order-routing.module';

import { RecycleBinOrderPage } from './recycle-bin-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecycleBinOrderPageRoutingModule
  ],
  declarations: [RecycleBinOrderPage]
})
export class RecycleBinOrderPageModule {}
