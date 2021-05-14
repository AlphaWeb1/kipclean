import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  resetId: string;
  inProcess: boolean;
  password: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.router.navigateByUrl('/login');
        return;
      }
      this.resetId = paramMap.get('id');
      // console.log(this.resetId);

    });
  }
  
  onChangePassword() {
    this.inProcess = true;
    this.authService.resetPassword(this.resetId, this.password).subscribe(
      res => {
        this.inProcess = false;
        this.utilService.showToast(res.message);
        if (res.status === 'success') {
          this.router.navigateByUrl('/login');
        }
      }, 
      err => {
        this.inProcess = false;
        this.utilService.showAlert(`Server Error`, err.error.message);
      }
    );
  }

}
