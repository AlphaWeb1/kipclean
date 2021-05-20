import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditProfileComponent } from './edit-profile.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  entryComponents: [],
  declarations: [
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    EditProfileComponent
  ]
})
export class EditProfileModule { }
