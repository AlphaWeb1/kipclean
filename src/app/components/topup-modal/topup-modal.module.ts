import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TopupModalComponent } from './topup-modal.component';



@NgModule({
  entryComponents: [],
  declarations: [
    TopupModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TopupModalComponent
  ]
})
export class TopupModalModule { }
