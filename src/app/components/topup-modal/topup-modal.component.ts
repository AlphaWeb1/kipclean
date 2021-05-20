import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { PaystackService } from 'src/app/services/paystack.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-topup-modal',
  templateUrl: './topup-modal.component.html',
  styleUrls: ['./topup-modal.component.scss'],
})
export class TopupModalComponent implements OnInit {
  
  inProcess: boolean;
  amount: number;
  walletBalance: number;

  constructor (
    private popupModal: ModalController,
    private authService: AuthenticationService,
    private utilService: UtilService,
    private paystackService: PaystackService
  ) {}

  ngOnInit(){
    // getWalletBalance
  }
  
  onTopup() {
    
  }

  private onProcessPaystackPayment(id: string, amount: number, reference: string) {
    const email = this.authService.user.value.email;
    this.inProcess = true;
    this.paystackService.processPayment(amount, reference, email)
      .then((res: any) => {
        if (res.status === 'closed') {
          // this.fbService.updateWalletTransactions(id, { status: 'aborted', dateUpdated: dayjs().format() }).subscribe();
          // update transaction table endpoint on cancellation
          this.inProcess = false;
          this.utilService.showToast('Wallet top-up cancelled.');
        } else if (res.status === 'success') {
          // const transPayload = {
          //   status: 'success',
          //   dateUpdated: dayjs().format()
          // };
          const newBalance = this.walletBalance + amount;
          this.walletBalance = newBalance;

          // this.fbService.updateWalletTransactions(id, transPayload).subscribe();
          
          // update transaction table endpoint on success
          // update user wallet endpoint
          // this.fbService.updateDigitalWallet(this.walletId, { balance: newBalance }).subscribe();
          // this.walletTransactions[0].status = transPayload.status;
          // this.walletTransactions[0].status = transPayload.dateUpdated;
          this.amount = 0;
          this.inProcess = false;
          this.utilService.showToast('Wallet top-up successful.');
        } else {
          this.inProcess = false;
          this.utilService.showToast('Wallet top-up failed. Please contact the company.');
        }
      })
      .catch((error) => {
        this.utilService.showToast('Error making Payment. Please try again.');
      })
      .finally(() => {});
  }
  
  closeModal(){
    this.popupModal.dismiss({
      'dismissed': true
    });
  }

}
