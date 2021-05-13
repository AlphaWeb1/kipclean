import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }
  
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!~`^+=<>?;:{}/\\\\|[\\]@*#\\$%\\^&\\*\\-\\_]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('(\\W|^)[\\w.+\\-]*@(gmail|yahoo|hotmail|outlook)\\.com(\\W|$)');
      const valid = regex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }
}
