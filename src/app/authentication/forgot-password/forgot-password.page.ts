import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string;
  code: string;
  isCodeSent: boolean;
  inProcess: boolean;

  constructor(
    private authService: AuthenticationService,
    private utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  onSendPasswordResetCode() {
    this.inProcess = true;
    this.authService.sendPasswordResetCode(this.email).subscribe(
      res => {
        this.inProcess = false;
        this.utilService.showToast(res.message);
        if (res.status === 'success') {
          this.isCodeSent = true;
        }
      }, err => {
        this.inProcess = false;
        this.utilService.showAlert(`Server Error`, err.error.message);
      }
    );
  }

  onVerifyResetCode() {
    this.inProcess = true;
    this.authService.verifyPasswordResetCode(this.email, this.code).subscribe(
      res => {
        this.inProcess = false;
        this.utilService.showToast(res.message);
        if (res.status === 'success') {
          this.router.navigateByUrl(`/reset-password/${res.data.id}`);
        }
      }, err => {
        this.inProcess = false;
        this.utilService.showAlert(`Server Error`, err.error.message);
      }
    );
  }

}
