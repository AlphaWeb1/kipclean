import { Injectable } from '@angular/core';

import Paystack, { setGlobalConfig } from 'paystack-simple';
import { environment } from 'src/environments/environment';
setGlobalConfig(environment.paystackPK);


@Injectable({
  providedIn: 'root'
})
export class PaystackService {

  paymentInstance: any;
  constructor( ) {
   }

  processPayment(amount: number, ref: string, email: string) {
    this.paymentInstance = Paystack();
    this.paymentInstance.init();
    return new Promise((resolve, reject) => {
      const paystackConvertedAmount = amount * 100;
      this.paymentInstance.addOptions({
        amount: paystackConvertedAmount,
        email,
        ref,
        channels: ['card'],
        callback : res => {
          if (res.status === 'success') {
            resolve(res);
          }
        },
        onClose: () => {
          resolve({ status: 'closed' });
        }
      });

      this.paymentInstance.pay();
    });
  }

}
