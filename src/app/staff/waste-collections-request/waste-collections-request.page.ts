import { Component, OnInit } from '@angular/core';

import * as dayjs from 'dayjs';

import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-waste-collections-request',
  templateUrl: './waste-collections-request.page.html',
  styleUrls: ['./waste-collections-request.page.scss'],
})
export class WasteCollectionsRequestPage implements OnInit {

  isLoading: boolean = true;
  isFetched: boolean;
  wasteCollections = [];
  datejs = dayjs();

  constructor(
    private utilService: UtilService,
    private backendService: BackendService,
  ) { }

  ngOnInit() {
    this.getCollections();
  }
  
  private getCollections(){
    this.wasteCollections = [];
    this.isLoading = true;
    this.backendService.getAllTransactions().subscribe(
      res => {
        if (res?.data) {
          this.wasteCollections = res.data.filter(transaction => transaction.type === 'WASTE COLLECTION');

          this.wasteCollections.forEach( async (wasteCollection) => {
            wasteCollection.expiredDate = dayjs(wasteCollection.createdAt).add(wasteCollection.unit, 'month');
            wasteCollection.isExpired = wasteCollection.expiredDate < dayjs() ? true : false;
          });
          this.isLoading = false;
        }
      },
      err => {
        this.isLoading = false;
        this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
      }
    );
  }
  

  confirmCompleted(wastecoll, idx){
    if (wastecoll.status !== 'SUCCESS' || wastecoll.status === 'COMPLETED') {
      this.utilService.showAlert(`Error`, 'Selected order is already confirmed.');
      return false;
    }
    if (wastecoll.status === 'SUCCESS') {
      this.backendService.updateTransaction({status: 'COMPLETED'}, wastecoll.id).subscribe(
        res => {
          this.wasteCollections[idx].status = 'COMPLETED';
          this.utilService.showToast(res.message);
        },
        err => {
          this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
        }
      );
    }
  }


}
