import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.page.html',
  styleUrls: ['./feedbacks.page.scss'],
})
export class FeedbacksPage implements OnInit {


  constructor(
    private popoverDrop: PopoverController
  ) { }

  ngOnInit() {
  }

  sendFeedback($event: any){

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
