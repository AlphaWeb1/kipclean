import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletFundsPage } from './wallet-funds.page';

const routes: Routes = [
  {
    path: '',
    component: WalletFundsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletFundsPageRoutingModule {}
