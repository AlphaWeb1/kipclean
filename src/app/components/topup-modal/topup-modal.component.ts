import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-topup-modal',
  templateUrl: './topup-modal.component.html',
  styleUrls: ['./topup-modal.component.scss'],
})
export class TopupModalComponent implements OnInit {

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
