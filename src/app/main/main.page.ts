import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log(this.router.url);
  }

  orderRecycleBin($event: any){
    console.log('recycle bin popup event fired');
  }

  logout(){
    this.authService.logout();
  }

}
