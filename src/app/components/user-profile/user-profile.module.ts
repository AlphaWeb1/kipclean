import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule { }
