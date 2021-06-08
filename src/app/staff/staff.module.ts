import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StaffPageRoutingModule } from './staff-routing.module';

import { StaffPage } from './staff.page';

import { NotificationModule } from '../components/notification/notification.module';
import { NotificationComponent } from '../components/notification/notification.component';
import { FeedbackInfoModule } from '../components/feedback-info/feedback-info.module';
import { FeedbackInfoComponent } from '../components/feedback-info/feedback-info.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { UserProfileModule } from '../components/user-profile/user-profile.module';

@NgModule({
  entryComponents: [
    NotificationComponent,
    FeedbackInfoComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationModule,
    FeedbackInfoModule,
    UserProfileModule,
    StaffPageRoutingModule
  ],
  declarations: [StaffPage]
})
export class StaffPageModule {}
