import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  updateForm: FormGroup;
  inProcess: boolean;
  
  @Input() profile: User;

  constructor(
    private fb: FormBuilder,
    private popupModal: ModalController,
    private authService: AuthenticationService,
    private util: UtilService,
    private customValidator: CustomValidationService
  ) { }

  ngOnInit() {
    console.log(this.profile);
    
    this.initUpdateForm();
  }

  onUpdateProfile(){
    // write update logic here
  }

  get updateFormControl() {
    return this.updateForm.controls;
  }

  private initUpdateForm() {
    this.updateForm = this.fb.group({
      firstName: [''+this.authService.user.value.first_name, Validators.required],
      lastName: [`${this.authService.user.value.surname}`, Validators.required],
      email: [`${this.authService.user.value.email}`, Validators.compose([Validators.required, Validators.email, this.customValidator.emailValidator()])],
      phone: [`${this.authService.user.value.phone}`, Validators.required],
      // password: ['', Validators.compose([Validators.required, this.customValidator.passwordValidator()])],
    });
  }

  closeModal(){
    this.popupModal.dismiss({
      'dismissed': true
    });
  }
}
