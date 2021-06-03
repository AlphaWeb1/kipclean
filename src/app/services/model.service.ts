import { Injectable } from '@angular/core';

import { Wallet } from 'src/app/interfaces/wallet';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  collectionDates = [];
  collectionDetail;
  binFee: number = 3000;
  collectionFee: number = 1000;
  notifications = [];
  orders = [];
  wallet: Wallet ;

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
