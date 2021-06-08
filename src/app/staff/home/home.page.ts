import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { ModelService } from 'src/app/services/model.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  collectionDates = [];

  constructor(
    private authService: AuthenticationService,
    public popupModal: ModalController,
    private backendService: BackendService,
    private utilService: UtilService,
    private modelService: ModelService,
    public popoverDrop: PopoverController
  ) { }

  ngOnInit() {
    this.getCollectionDates();
  }

  async showNotifications(){
    const popover = await this.popoverDrop.create({
      component: NotificationComponent,
      componentProps: {
        sourceFired: 'admin',
      }
    });
    return await popover.present();
  }

  private getCollectionDates(){
    this.collectionDates = this.modelService.getCollectionDates();
  }

}
