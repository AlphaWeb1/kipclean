import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  registerClicked: boolean = true;

  constructor(
    private router: Router
  ) {}

  toggleHomeButton($event){
    // console.log($event.target.value);
    this.registerClicked = $event.target.value === 'signin' ? false : true;
  }

}
