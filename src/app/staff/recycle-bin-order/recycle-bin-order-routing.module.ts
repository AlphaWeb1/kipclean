import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecycleBinOrderPage } from './recycle-bin-order.page';

const routes: Routes = [
  {
    path: '',
    component: RecycleBinOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecycleBinOrderPageRoutingModule {}
