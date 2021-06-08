import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import * as dayjs from 'dayjs';

import { NotificationComponent } from 'src/app/components/notification/notification.component';
import { UserProfileComponent } from 'src/app/components/user-profile/user-profile.component';
import { User } from 'src/app/interfaces/user';

import { BackendService } from 'src/app/services/backend.service';
import { ModelService } from 'src/app/services/model.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  inProcess: boolean;
  isLoading: boolean = true;
  constructor(
    public popupModal: ModalController,
    private popoverDrop: PopoverController,
    private utilService: UtilService,
    private backendService: BackendService,
    private modelService: ModelService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }
  
  async showUser(user: User, idx){
    user.collection_date = await this.getNextCollectionDate(user.collection_date);
    const modal = await this.popupModal.create({
      component: UserProfileComponent,
      componentProps: {
        sourceFired: 'client',
        user,
        idx
      }
    });
    
    modal.onDidDismiss().then(
      data => {
        this.loadUsers();
      }
    );
    return await modal.present();
  }
  
  private getNextCollectionDate(setDay: string = this.modelService.days[dayjs().day()]){
    const setDateIndex = this.modelService.days.indexOf(setDay),
    today = dayjs().day() ;
    if (today === setDateIndex) {
      return `Today: ${dayjs().format("ddd, D MMM YYYY")}`;
    } else {
      const nextDays = (setDateIndex + 7 - today) % 7;
      return dayjs().add(nextDays, 'day').format('ddd, D MMM YYYY');
    }
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
  
  loadUsers(){
    this.isLoading = true;
    this.backendService.getUsers().subscribe(
      res => {
        this.modelService.users = [];
        if (res?.data) {
          this.modelService.users = res.data.filter(user => user.role === 'customer');
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
