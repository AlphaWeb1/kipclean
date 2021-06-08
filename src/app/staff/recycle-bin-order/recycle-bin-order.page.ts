import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { ModelService } from 'src/app/services/model.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-recycle-bin-order',
  templateUrl: './recycle-bin-order.page.html',
  styleUrls: ['./recycle-bin-order.page.scss'],
})
export class RecycleBinOrderPage implements OnInit {

  inProcess: boolean;
  isLoading: boolean = true;
  constructor(
    private popoverDrop: PopoverController,
    private authService: AuthenticationService,
    private utilService: UtilService,
    private backendService: BackendService,
    private modelService: ModelService
  ) { }

  ngOnInit() {
    this.loadOrders();
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
  
  loadOrders(){
    this.isLoading = true;
    this.backendService.getAllTransactions().subscribe(
      res => {
        this.modelService.orders = [];
        if (res?.data) {
          this.modelService.orders = res.data.filter(transaction => transaction.type === 'RECYCLE BIN ORDER');
          this.isLoading = false;
        }
      },
      err => {
        this.isLoading = false;
        this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
      }
    );
  }

  confirmCompleted(order, idx){
    if (order.status !== 'SUCCESS' || order.status === 'COMPLETED') {
      this.utilService.showAlert(`Error`, 'Selected order is already confirmed.');
      return false;
    }
    if (order.status === 'SUCCESS') {
      this.backendService.updateTransaction({status: 'COMPLETED'}, order.id).subscribe(
        res => {
          this.modelService.orders[idx].status = 'COMPLETED';
          // if (res?.data) {
          //   this.loadOrders();
          // }
          this.utilService.showToast(res.message);
        },
        err => {
          this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
        }
      );
    }
  }

}
