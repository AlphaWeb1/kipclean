import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletFundsPageRoutingModule } from './wallet-funds-routing.module';

import { WalletFundsPage } from './wallet-funds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletFundsPageRoutingModule
  ],
  declarations: [WalletFundsPage]
})
export class WalletFundsPageModule {}
