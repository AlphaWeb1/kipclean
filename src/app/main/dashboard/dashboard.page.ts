import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
