import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registrationForm: FormGroup;
  inProcess: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private util: UtilService,
    private customValidator: CustomValidationService
  ) { }

  ngOnInit() {
    this.initRegistrationForm();
  }

  onRegister() {
    this.inProcess = true;
    const payload: User = {
      firstname: this.registrationForm.value.firstName,
      surname: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      phone: this.registrationForm.value.phone,
      password: this.registrationForm.value.password
    };
    
    this.authService.register(payload).subscribe(
      res => {
        this.util.showToast(res.message);
        this.router.navigateByUrl('/login');
        this.inProcess = false;
      }, err => {
        this.util.showAlert(`Server Error`, err.error.message);
        this.inProcess = false;
      }
    );
  }

  private initRegistrationForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email, this.customValidator.emailValidator()])],
      phone: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, this.customValidator.passwordValidator()])],
    });
  }

}
