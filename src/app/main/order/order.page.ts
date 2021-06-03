import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { ModelService } from 'src/app/services/model.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
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
    this.loadOrders(this.authService.accessToken.value);
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
  
  loadOrders(accessToken){
    
    this.modelService.orders = [];
    this.isLoading = true;
    this.backendService.getTransactions({accessToken}).subscribe(
      res => {
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
}
