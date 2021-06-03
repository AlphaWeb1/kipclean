import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { Transaction } from 'src/app/interfaces/transaction';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { ModelService } from 'src/app/services/model.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {

  inProcess: boolean;
  isLoading: boolean;
  isValid: boolean;
  amount: number;
  unit: number = 1;
  collIdx: number;
  location: string;
  @Input() collectionDates: any;
  validators: any = {unit: false, collIdx: false, location: false};

  constructor(
    private popupModal: ModalController,
    private authService: AuthenticationService,
    private utilService: UtilService,
    private backendService: BackendService,
    private modelService: ModelService,
  ) { }

  ngOnInit() {

  }

  updateCollectionDate(){
    this.validateControls();
    if (this.isValid) {
      this.inProcess = true;
      const amount = (this.modelService.collectionFee * this.unit);
      const transaction: Transaction = {
        email: this.authService.user.value.email,
        amount: amount,
        unit: this.unit,
        reference: 'TRAN1' + Math.random().toString(36).substr(2, 9) + '',
        status: 'SUCCESS',
        type: 'WASTE COLLECTION',
      },
      queryParam = { auth_access_token: this.authService.accessToken.value.toString };

      this.backendService.saveTransaction(transaction).subscribe(
      res => {
        this.backendService.updateWallet({amount: (amount * -1)}).subscribe(
        res => {
          const payload = {
            collection_date: this.modelService.collectionDates[this.collIdx].date,
            location: `${this.location}, ${this.modelService.collectionDates[this.collIdx].location}`,
          };
          this.backendService.updateProfile(payload).subscribe(
          res => {
            this.utilService.showToast('Waste collection request is successfully processed');
            this.inProcess = false;
            
            const colldate = dayjs(res.data.collection_date);
            this.modelService.collectionDetail = {
              collection_date: (
                  dayjs() > colldate ? colldate.add(7, 'day').format('ddd, D MMM YYYY') : colldate.format('ddd, D MMM YYYY')
                ),
              location: res.data.location
            }
            
            this.authService.storeUser(res.data);
            this.authService.user.next(res.data);
            this.backendService.createNotification({text: `Waste Collection Date Subscribed.`, url: '/main/tabs/dashboard', status: "unread"}).subscribe(
              res => this.closeModal(),
              err => {
                this.utilService.showAlert('Server Error', 'Unable to create notification.');
                this.closeModal()
              }
            );
          }, err => {
            this.utilService.showAlert(`Server Error`, err.error.message);
            this.inProcess = false;
          });
        },
        err => {
          this.utilService.showAlert(`Server Error`, err.error.message);
          this.inProcess = false;
        });
      },
      err => {
        this.utilService.showAlert(`Server Error`, err.error.message);
        this.inProcess = false;
      });
    }
  }

  validateControls() {
    this.isValid = true;
    if ( this.modelService.wallet.amount < (this.modelService.collectionFee * this.unit) ) {
      this.utilService.showAlert(`Insufficient Fund`, 'Your wallet ballance is not sufficient kindly topup.');
      this.isValid = false;
    }

    this.validators.unit = this.unit < 1 ? {invalid : true, message: 'enter a valid number of month'} : false;
    this.validators.collIdx = !this.modelService.collectionDates[this.collIdx] ? {invalid : true, message: 'select a valid collection date'} : false;
    this.validators.location = (!this.location || this.location == '') ? {invalid : true, message: 'enter your collection address'} : false;

    if (this.validators.unit || this.validators.location || this.validators.collIdx){
      this.isValid = false;
    }
  }
  
  closeModal(){
    this.popupModal.dismiss({
      'dismissed': true,
      wallet: this.modelService.wallet
    });
  }

}
