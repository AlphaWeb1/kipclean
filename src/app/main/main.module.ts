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

@NgModule({
  entryComponents: [
    TopupModalComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationModule,
    TopupModalModule,
    MainPageRoutingModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
