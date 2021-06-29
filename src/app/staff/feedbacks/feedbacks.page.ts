import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { FeedbackInfoComponent } from 'src/app/components/feedback-info/feedback-info.component';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.page.html',
  styleUrls: ['./feedbacks.page.scss'],
})
export class FeedbacksPage implements OnInit {
  message: string;
  status: string = 'unread';
  inProcess: boolean;
  isLoading: boolean = true;
  feedbacks: any = [];

  constructor(
    public popupModal: ModalController,
    private popoverDrop: PopoverController,
    private utilService: UtilService,
    private backendService: BackendService
  ) { }

  ngOnInit() {
    this.getFeedbacks();
  }

  sendFeedback(){
    if (!this.message || this.message === '') {
      
    } else {
      this.inProcess = true;
      this.backendService.createFeedback({message: this.message, status: this.status}).subscribe(
        res => {
          this.getFeedbacks();
          this.inProcess = false;
          this.utilService.showToast(res.message);
        },
        err => {
          this.inProcess = false;
          this.utilService.showAlert('Server Error', 'Unable to send feedback. Try later please.');
        }
      );
    }
  }
  
  async showFeedback(feedback, idx){

    const modal = await this.popupModal.create({
      component: FeedbackInfoComponent,
      componentProps: {
        sourceFired: 'client',
        feedback,
        idx
      }
    });
    
    modal.onDidDismiss().then(
      data => {
        this.getFeedbacks();
        // this.feedbacks[idx].status = 'read';
      }
    );
    return await modal.present();
  }

  private getFeedbacks(){
    this.isLoading = false;
    this.backendService.getFeedbacks().subscribe(
      res => {
      this.feedbacks = [];
        if (res?.data) {
          const feedbacks = res.data;
          console.log(feedbacks);
          
          feedbacks.forEach(feedback => feedback.date_string = dayjs(feedback.createdAt).format('ddd, D MMM YYYY') );
          this.feedbacks = feedbacks;
          this.isLoading = false;
        }
      },
      err => {
        this.isLoading = false;
        this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
      }
    );
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
