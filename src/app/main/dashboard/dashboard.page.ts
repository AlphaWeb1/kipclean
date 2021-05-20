import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

import { TopupModalComponent } from 'src/app/components/topup-modal/topup-modal.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    public popupModal: ModalController,
    public popoverDrop: PopoverController
  ) { }

  ngOnInit() {
  }

  async topUpWallet($event: any){
    const modal = await this.popupModal.create({
      component: TopupModalComponent,
      componentProps: {
        sourceFired: 'client',
        data: $event
      }
    });
    return await modal.present();
  }

  async showNotifications($event: any){
    const popover = await this.popoverDrop.create({
      component: NotificationComponent,
      componentProps: {
        sourceFired: 'client',
        data: $event
      }
    });
    return await popover.present();
  }

  async showCollectionSearch($event: any){
    console.log('popup collection serch modal');
  }
}
