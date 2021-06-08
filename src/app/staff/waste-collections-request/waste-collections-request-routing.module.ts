import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WasteCollectionsRequestPage } from './waste-collections-request.page';

const routes: Routes = [
  {
    path: '',
    component: WasteCollectionsRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WasteCollectionsRequestPageRoutingModule {}
