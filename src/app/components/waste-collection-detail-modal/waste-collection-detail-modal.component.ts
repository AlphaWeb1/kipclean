import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import * as dayjs from 'dayjs';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-waste-collection-detail-modal',
  templateUrl: './waste-collection-detail-modal.component.html',
  styleUrls: ['./waste-collection-detail-modal.component.scss'],
})
export class WasteCollectionDetailModalComponent implements OnInit {

  isLoading: boolean = true;
  isFetched: boolean;
  wasteCollections = [];
  datejs = dayjs();

  constructor(
    private popupModal: ModalController,
    private authService: AuthenticationService,
    private utilService: UtilService,
    private backendService: BackendService,
  ) {}

  ngOnInit() {
    this.getTransCollections(this.authService.accessToken.value);
  }
  
  private getTransCollections(accessToken: string){
    this.wasteCollections = [];
    this.isLoading = true;
    this.backendService.getTransactions({accessToken}).subscribe(
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

  closeModal(){
    this.popupModal.dismiss({
      'dismissed': true
    });
  }
}
