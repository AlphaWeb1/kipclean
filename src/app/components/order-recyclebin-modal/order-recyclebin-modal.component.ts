import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Transaction } from 'src/app/interfaces/transaction';

import { Wallet } from 'src/app/interfaces/wallet';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { ModelService } from 'src/app/services/model.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-order-recyclebin-modal',
  templateUrl: './order-recyclebin-modal.component.html',
  styleUrls: ['./order-recyclebin-modal.component.scss'],
})
export class OrderRecyclebinModalComponent implements OnInit {
 
  inProcess: boolean;
  isLoading: boolean;
  unit: number;
  reference: string;
  id: any;

  constructor(
    private popupModal: ModalController,
    private authService: AuthenticationService,
    private utilService: UtilService,
    private backendService: BackendService,
    private modelService: ModelService,
  ) { }

  ngOnInit() {

  }

  orderRecycleBin(){
    const amount = this.modelService.binFee * this.unit;
    this.inProcess = true;
    if (this.modelService.wallet.amount < amount) {
      this.utilService.showAlert(`Insufficient Fund`, 'Your wallet ballance is not sufficient to order recycle bin.');
      return false;
    } else {
      this.backendService.updateWallet({amount: (amount * -1)}).subscribe(
        res => {
          this.modelService.wallet.amount -= amount;
          this.reference = 'TRAN1' + Math.random().toString(36).substr(2, 9) + '';
          const transaction: Transaction = {
            email: this.authService.user.value.email,
            amount: amount,
            reference: this.reference,
            unit: this.unit,
            status: 'SUCCESS',
            type: 'RECYCLE BIN ORDER',
          },
          queryParam = { auth_access_token: this.authService.accessToken.value.toString };
          this.backendService.saveTransaction(transaction, queryParam).subscribe();
          this.inProcess = false;
          this.utilService.showToast('Recycle bin successfully ordered.');
          this.backendService.createNotification({text: `Recycle bin successfully ordered.`, url: '/main/tabs/order', status: "unread"}).subscribe(
            res => this.closeModal(),
            err => {
              this.utilService.showAlert('Server Error', 'Unable to create notification.');
              this.closeModal()
            }
          );
        },
        err =>{
          this.inProcess = false;
          this.utilService.showToast('Server Error', 'Unable to process transaction.');
        });
    }
  }
  
  closeModal(){
    this.popupModal.dismiss({
      'dismissed': true,
      wallet: this.modelService.wallet
    });
  }

}
