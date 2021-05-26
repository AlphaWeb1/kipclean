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

@NgModule({
  entryComponents: [
    TopupModalComponent,
    NotificationComponent,
    OrderRecyclebinModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationModule,
    TopupModalModule,
    OrderRecyclebinModalModule,
    MainPageRoutingModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
