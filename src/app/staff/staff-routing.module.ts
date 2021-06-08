import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffPage } from './staff.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: StaffPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'wallet-funds',
        loadChildren: () => import('./wallet-funds/wallet-funds.module').then( m => m.WalletFundsPageModule)
      },
      {
        path: 'collections',
        loadChildren: () => import('./waste-collections-request/waste-collections-request.module').then( m => m.WasteCollectionsRequestPageModule)
      },
      {
        path: 'feedbacks',
        loadChildren: () => import('./feedbacks/feedbacks.module').then( m => m.FeedbacksPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./recycle-bin-order/recycle-bin-order.module').then( m => m.RecycleBinOrderPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/staff/tabs/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffPageRoutingModule {}
