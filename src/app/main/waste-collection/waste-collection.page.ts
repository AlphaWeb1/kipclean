import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-waste-collection',
  templateUrl: './waste-collection.page.html',
  styleUrls: ['./waste-collection.page.scss'],
})
export class WasteCollectionPage implements OnInit {

  collectionDates = [];

  constructor(
    private modelService: ModelService
  ) { }

  ngOnInit() {
    this. getCollectionDates();
  }


  private getCollectionDates(){
    this.collectionDates = this.modelService.getCollectionDates();
  }
}
