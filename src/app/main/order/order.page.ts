import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(
    private popoverDrop: PopoverController
  ) { }

  ngOnInit() {
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
}
