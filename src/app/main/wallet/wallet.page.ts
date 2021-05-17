import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TopupModalComponent } from 'src/app/components/topup-modal/topup-modal.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  constructor(
    public popupModal: ModalController
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

}
