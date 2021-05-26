import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

import { TopupModalComponent } from 'src/app/components/topup-modal/topup-modal.component';
import { Wallet } from 'src/app/interfaces/wallet';
import { BackendService } from 'src/app/services/backend.service';
import { ModelService } from 'src/app/services/model.service';
import { UtilService } from 'src/app/services/util.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  isLoading: boolean;
  wallet: Wallet;
  collectionDates = [];
  datejs = dayjs();
  
  constructor(
    private authService: AuthenticationService,
    public popupModal: ModalController,
    private backendService: BackendService,
    private utilService: UtilService,
    private modelService: ModelService,
    public popoverDrop: PopoverController
  ) { }

  ngOnInit() {
    this.getWalletBalance(this.authService.accessToken.value);
    // this.getTransactions(this.authService.accessToken.value);
    this. getCollectionDates();
  }

  async topUpWallet(){
    const modal = await this.popupModal.create({
      component: TopupModalComponent,
      componentProps: {
        sourceFired: 'client',
        wallet: this.wallet
      }
    });
    
    modal.onDidDismiss().then(
      data => {
        this.getWalletBalance(this.authService.accessToken.value);
        // this.getTransactions(this.authService.accessToken.value);
        this. getCollectionDates();
      }
    );
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
  
  private getWalletBalance(accessToken: string){
    this.isLoading = true;
    this.backendService.getWallet({accessToken}).subscribe(
      res => {
        this.isLoading = false;
        if (res?.data) {
          this.wallet = {amount: res.data.balance, email: this.authService.user.value.email};
        }
      },
      err => {
        this.isLoading = false;
        this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
      }
    );
  }

  private getCollectionDates(){
    this.collectionDates = this.modelService.getCollectionDates();
  }
}
