import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import * as dayjs from 'dayjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { ModelService } from 'src/app/services/model.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})

export class NotificationComponent implements OnInit {

  isLoading: boolean = true;
  canNavigate: boolean = false;
  notifications: any = [];

  constructor(
    public popoverDrop: PopoverController,
    private backendService: BackendService,
    private authService: AuthenticationService,
    private utilService: UtilService,
    private modelService: ModelService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadNotifications();
  }

  loadNotifications(){
    this.isLoading = true;
    this.backendService.getNotifications({accessToken: this.authService.accessToken.value}).subscribe(
      res => {
        this.isLoading = false;
        if (res?.data) {
          const notifications = res.data;
          notifications.forEach(notification => notification.date_string = dayjs(notification.createdAt).format('ddd, D MMM YYYY') );
          this.modelService.notifications = notifications;
        }
      },
      err => {
        this.isLoading = false;
        this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
      }
    );
  }

  markRead(id: string){
    this.isLoading = true;
    this.backendService.updateNotification({status: 'read'}, id).subscribe(
      res => {
        this.isLoading = false;
        if (res?.data) {
          this.loadNotifications();
        }
      },
      err => {
        this.isLoading = false;
        this.utilService.showAlert(`Server Error`, 'Unable to connect to server. Please try again.');
      }
    );
    this.canNavigate = true;
    
  }
  
  navigateToUrl(notif: any){
    this.canNavigate = false;
    if (notif.statys === 'unread'){
      this.markRead(notif.id);
    } else {
      this.canNavigate = true;
    }

    if (this.canNavigate) {
      this.router.navigateByUrl( notif.url);
      this.closeModal();
    }
  }

  closeModal(){
    this.popoverDrop.dismiss({
      'dismissed': true
    });
  }
}
