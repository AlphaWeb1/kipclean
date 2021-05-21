import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public popupModal: ModalController,
    public popoverDrop: PopoverController
  ) { }

  ngOnInit() {
  }

  async editProfile($event: any){
    const modal = await this.popupModal.create({
      component: EditProfileComponent,
      componentProps: {
        sourceFired: 'client',
        data: $event
      }
    });
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

}
