import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { BackendService } from 'src/app/services/backend.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-feedback-info',
  templateUrl: './feedback-info.component.html',
  styleUrls: ['./feedback-info.component.scss'],
})
export class FeedbackInfoComponent implements OnInit {

  @Input() feedback;
  @Input() idx;

  constructor(
    private popupModal: ModalController,
    private utilService: UtilService,
    private backendService: BackendService,
  ) { }

  ngOnInit() {
    this.updateFeedback(this.feedback);
  }

  updateFeedback(feedback){
    if (feedback.status !== 'unread') {
      return false;
    }
    if (feedback.status === 'unread') {
      this.backendService.updateFeedback({status: 'read'}, feedback.id).subscribe(
        res => {
          this.feedback.status = 'read';
        },
        err => {
          this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
        }
      );
    }
  }

  closeModal(){
    this.popupModal.dismiss({
      'dismissed': true
    });
  }
}
