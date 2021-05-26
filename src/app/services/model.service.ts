import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WasteCollectionDate } from '../interfaces/waste-collection-date';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  collectionDates = [];
  binFee: number = 3000;

  constructor() { 
    this.initCollectionDate();
  }
  initCollectionDate(){
    this.collectionDates = [
      { date: "2021-05-27", location: "Lekki Phase 1", },
      { date: "2021-05-28", location: "Lekki Phase 11", },
      { date: "2021-05-29", location: "Victoria Island", },
      { date: "2021-05-30", location: "Lagos Island", },
      { date: "2021-05-31", location: "Ibeju Lekki", },
      { date: "2021-06-01", location: "Sangotedo - Abijoh", },
      { date: "2021-06-02", location: "Ikoyi Lagos Island", },
    ]

  }
  
  getCollectionDates(){
    return this.collectionDates;
  }
}
