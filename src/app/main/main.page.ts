import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OrderRecyclebinModalComponent } from '../components/order-recyclebin-modal/order-recyclebin-modal.component';

import { AuthenticationService } from '../services/authentication.service';
import { BackendService } from '../services/backend.service';
import { ModelService } from '../services/model.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  orders = [];

  constructor(
    public popupModal: ModalController,
    private authService: AuthenticationService,
    private backendService: BackendService,
    private router: Router,
    private utilService: UtilService,
    private modelService: ModelService
  ) { }

  ngOnInit() {
    this.getWalletBalance(this.authService.accessToken.value);
  }

  async orderRecycleBin(){
    const modal = await this.popupModal.create({
      component: OrderRecyclebinModalComponent,
      componentProps: {
        sourceFired: 'client',
        wallet: this.modelService.wallet
      }
    });
    
    modal.onDidDismiss().then(
      data => {
        this.getWalletBalance(this.authService.accessToken.value);
        this.loadOrders(this.authService.accessToken.value);
      }
    );
    return await modal.present();
  }
  
  private getWalletBalance(accessToken: string){
    this.backendService.getWallet({accessToken}).subscribe(
      res => {
        if (res?.data) {
          this.modelService.wallet = {amount: res.data.balance, email: this.authService.user.value.email};
        }
      },
      err => {
        this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
      }
    );
  }
  
  loadOrders(accessToken){
    
    this.orders = [];
    this.backendService.getTransactions({accessToken}).subscribe(
      res => {
        if (res?.data) {
          this.orders = res.data.filter(transaction => transaction.type === 'RECYCLE BIN ORDER');
        }
      },
      err => {
        this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
      }
    );
  }

  logout(){
    this.authService.logout();
  }

}
