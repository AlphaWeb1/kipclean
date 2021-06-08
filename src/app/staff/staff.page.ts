import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { BackendService } from '../services/backend.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})
export class StaffPage implements OnInit {

  orders = [];
  constructor(
    private authService: AuthenticationService,
    private backendService: BackendService,
    private router: Router,
    private utilService: UtilService,
  ) { }

  ngOnInit() {
  }
  
  logout(){
    this.authService.logout();
  }

}
