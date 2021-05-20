import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  inProcess: boolean;

  constructor(
    private authService: AuthenticationService,
    private util: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  
  onLogin() {
    this.inProcess = true;
    this.authService.login(this.email, this.password).subscribe(
      res => {
        this.inProcess = false;
        if (res.status === 'success') {
          this.email = null;
          this.password = null;
          this.router.navigateByUrl('/main');
          this.util.showToast(res.message);
        } 
        // else {
        //   this.util.showAlert(`Invalid Login Credentials`, res?.message);
        // }
      }, err => {
        this.inProcess = false;
        this.util.showAlert(`Server Error`, err.error.message);
      }
    );
  }

}
