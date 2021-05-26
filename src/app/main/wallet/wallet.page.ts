import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { TopupModalComponent } from 'src/app/components/topup-modal/topup-modal.component';
import { Transaction } from 'src/app/interfaces/transaction';
import { Wallet } from 'src/app/interfaces/wallet';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  inProcess: boolean;
  isLoading: boolean = true;
  wallet: Wallet;
  transactions = [];
  constructor(
    public popupModal: ModalController,
    public popoverDrop: PopoverController,
    private authService: AuthenticationService,
    private utilService: UtilService,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.getWalletBalance(this.authService.accessToken.value);
    this.getTransactions(this.authService.accessToken.value);
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
        this.wallet = data.data.wallet;
        // this.getWalletBalance(this.authService.accessToken.value);
        this.getTransactions(this.authService.accessToken.value);
      }
    ); 
    return await modal.present();
  }

  async showNotifications(){
    const popover = await this.popoverDrop.create({
      component: NotificationComponent,
      componentProps: {
        sourceFired: 'client',
        data: this.wallet
      }
    });
    await popover.present();
    // const { role } = await popover.onDidDismiss();
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

  private getTransactions(accessToken: string){
    this.transactions = [];
    this.backendService.getTransactions({accessToken}).subscribe(
      res => {
        if (res?.data) {
          this.transactions = res.data;
        }
      },
      err => {
        this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
      }
    );
  }

}
