import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { EditProfileModule } from 'src/app/components/edit-profile/edit-profile.module';

@NgModule({
  entryComponents: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
