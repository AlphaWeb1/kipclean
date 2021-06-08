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
  users = [];
  wallet: Wallet ;
  days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  constructor() { 
    this.initCollectionDate();
  }
  initCollectionDate(){
    this.collectionDates = [
      { date: "Thursday", location: "Lekki Phase 1", },
      { date: "Friday", location: "Lekki Phase 11", },
      { date: "Saturday", location: "Victoria Island", },
      { date: "Sunday", location: "Lagos Island", },
      { date: "Monday", location: "Ibeju Lekki", },
      { date: "Tuesday", location: "Sangotedo - Abijoh", },
      { date: "Wednesday", location: "Ikoyi Lagos Island", }
    ]

  }
  
  getCollectionDates(){
    return this.collectionDates;
  }
}
