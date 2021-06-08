import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  @Input() user: User;

  constructor(
    private popupModal: ModalController
  ) { }

  ngOnInit() {}

  closeModal(){
    this.popupModal.dismiss({
      'dismissed': true
    });
  }
}
