import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { NotificationModule } from '../components/notification/notification.module';
import { TopupModalModule } from '../components/topup-modal/topup-modal.module';
import { TopupModalComponent } from '../components/topup-modal/topup-modal.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { OrderRecyclebinModalModule } from '../components/order-recyclebin-modal/order-recyclebin-modal.module';
import { OrderRecyclebinModalComponent } from '../components/order-recyclebin-modal/order-recyclebin-modal.component';
import { NewOrderComponent } from '../components/new-order/new-order.component';
import { NewOrderModule } from '../components/new-order/new-order.module';
import { WasteCollectionDetailModalModule } from '../components/waste-collection-detail-modal/waste-collection-detail-modal.module';

@NgModule({
  entryComponents: [
    TopupModalComponent,
    NotificationComponent,
    OrderRecyclebinModalComponent,
    NewOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationModule,
    TopupModalModule,
    OrderRecyclebinModalModule,
    WasteCollectionDetailModalModule,
    NewOrderModule,
    MainPageRoutingModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
