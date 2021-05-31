import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Wallet } from 'src/app/interfaces/wallet';
import { Transaction } from 'src/app/interfaces/transaction';

import * as dayjs from 'dayjs';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { PaystackService } from 'src/app/services/paystack.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-topup-modal',
  templateUrl: './topup-modal.component.html',
  styleUrls: ['./topup-modal.component.scss'],
})
export class TopupModalComponent implements OnInit {
  
  inProcess: boolean;
  isLoading: boolean;
  amount: number;
  reference: string;
  @Input() wallet: Wallet;
  id: any;

  constructor (
    private popupModal: ModalController,
    private authService: AuthenticationService,
    private utilService: UtilService,
    private paystackService: PaystackService,
    private backendService: BackendService
  ) {}

  ngOnInit(){
  }
  
  onTopup() {
    this.reference = 'TRAN1' + Math.random().toString(36).substr(2, 9) + '';
    this.onProcessPaystackPayment("01", this.amount, this.reference, this.authService.accessToken.value);
  }

  private onProcessPaystackPayment(id: string, amount: number, reference: string, accessToken: string) {
    const email = this.authService.user.value.email;
    this.inProcess = true;
    this.paystackService.processPayment(amount, reference, email)
      .then((res: any) => {
        if (res.status === 'closed') {
          const transaction: Transaction = {
              email: this.authService.user.value.email,
              amount: amount,
              reference,
              status: 'FAILED',
              type: 'WALLET',
            },
            queryParam = { auth_access_token: this.authService.accessToken.value.toString };
          this.backendService.saveTransaction(transaction, queryParam).subscribe();
          this.inProcess = false;
          this.utilService.showToast('Wallet top-up cancelled.');

        } else if (res.status === 'success') {
          const newBalance = this.wallet.amount + amount;
          this.wallet.amount = newBalance;

          this.backendService.updateWallet({amount}, {accessToken}).subscribe(
            res => {
              this.amount = 0;
              this.inProcess = false;
              this.utilService.showToast('Wallet funded successfull.');
              this.backendService.createNotification({text: `₦${newBalance} was credited to your wallet.`, url: '/main/tabs/wallet', status: "unread"}).subscribe(
                res => this.closeModal(),
                err => {
                  this.utilService.showAlert('Server Error', 'Unable to create notification.');
                  this.closeModal()
                }
              );
            },
            err => {
              this.utilService.showToast('Error making Payment. Please try again.');
            }
          );
        } else {
          this.inProcess = false;
          this.utilService.showToast('Wallet top-up failed. Please contact the company.');
        }
      }).catch((error) => {
        this.utilService.showToast('Error making Payment. Please try again.');
      })
      .finally(() => {});
  }
  
  closeModal(){
    this.popupModal.dismiss({
      'dismissed': true,
      wallet: this.wallet
    });
  }

}
