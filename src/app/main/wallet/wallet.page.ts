import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { TopupModalComponent } from 'src/app/components/topup-modal/topup-modal.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  constructor(
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
    await popover.present();
    
    // const { role } = await popover.onDidDismiss();
  }

}
