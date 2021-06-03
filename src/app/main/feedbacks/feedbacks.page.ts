import { Component, OnInit } from '@angular/core';

import { PopoverController } from '@ionic/angular';
import * as dayjs from 'dayjs';

import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { ModelService } from 'src/app/services/model.service';
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
    private popoverDrop: PopoverController,
    private popupModal: ModelService,
    private authService: AuthenticationService,
    private utilService: UtilService,
    private backendService: BackendService,
  ) {}

  ngOnInit() {
    this.getUserFeedbacks();
  }

  sendFeedback(){
    if (!this.message || this.message === '') {
      
    } else {
      this.inProcess = true;
      this.backendService.createFeedback({message: this.message, status: this.status}).subscribe(
        res => {
          this.getUserFeedbacks();
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

  private getUserFeedbacks(){
    this.isLoading = false;
    this.backendService.getUserFeedbacks().subscribe(
      res => {
      this.feedbacks = [];
        if (res?.data) {
          const feedbacks = res.data;
          feedbacks.forEach(feedback => feedback.date_string = dayjs(feedback.createdAt).format('ddd, D MMM YYYY') );
          this.feedbacks = feedbacks;
          this.isLoading = false;
        }
      },
      err => {
        this.isLoading = false;
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
