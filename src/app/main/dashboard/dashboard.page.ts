import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { NewOrderComponent } from 'src/app/components/new-order/new-order.component';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

import { TopupModalComponent } from 'src/app/components/topup-modal/topup-modal.component';
import { WasteCollectionDetailModalComponent } from 'src/app/components/waste-collection-detail-modal/waste-collection-detail-modal.component';
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
  wasteCollections = [];
  isFetched: boolean = false;
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
    this.initCollectionDetail();
    this.getTransCollections(this.authService.accessToken.value);
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
        this.getCollectionDates();
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

  async newCollectionModal(){
    const modal = await this.popupModal.create({
      component: NewOrderComponent,
      componentProps: {
        sourceFired: 'client',
        collectionDates: this.modelService.getCollectionDates()
      }
    });
    
    modal.onDidDismiss().then(
      data => {
        this.getTransCollections(this.authService.accessToken.value);
      }
    );

    return await modal.present();
  }

  async showCollectionDetail(){
    const modal = await this.popupModal.create({
      component: WasteCollectionDetailModalComponent,
      componentProps: {
        sourceFired: 'client',
        collectionDates: this.modelService.getCollectionDates()
      }
    });
    
    modal.onDidDismiss().then(
      data => {
      }
    );

    return await modal.present();
  }

  private collectionDetail(){
    if (this.modelService.collectionDetail  && this.wasteCollections[0]?.isExpired !== true) {
      this.showCollectionDetail();
    } else {
      this.newCollectionModal();
    }
  }

  private initCollectionDetail(){
    const colldate = dayjs(this.authService.user.value.collection_date);
    this.modelService.collectionDetail = {
      collection_date: (
          dayjs() > colldate ? colldate.add(7, 'day').format('ddd, D MMM YYYY') : colldate.format('ddd, D MMM YYYY')
        ),
      location: this.authService.user.value.location
    }
  }
  
  private getWalletBalance(accessToken: string){
    this.isLoading = true;
    this.backendService.getWallet({accessToken}).subscribe(
      res => {
        this.isLoading = false;
        if (res?.data) {
          this.wallet = { amount: res.data.balance, email: this.authService.user.value.email };
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
  
  private getTransCollections(accessToken: string){
    this.wasteCollections = [];
    this.backendService.getTransactions({accessToken}).subscribe(
      res => {
        if (res?.data) {
          this.wasteCollections = res.data.filter(transaction => transaction.type === 'WASTE COLLECTION');
          this.isFetched = true;
        }

        if (this.isFetched && this.wasteCollections[0]) {
          this.wasteCollections[0].expiredDate = dayjs(this.wasteCollections[0].createdAt).add(this.wasteCollections[0].unit, 'month');
          this.wasteCollections[0].isExpired = this.wasteCollections[0].expiredDate < dayjs() ? true : false;
        }
      },
      err => {
        this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
      }
    );
  }
}
