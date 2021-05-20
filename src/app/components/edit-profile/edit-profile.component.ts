import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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

  constructor(
    private fb: FormBuilder,
    private popupModal: ModalController,
    private authService: AuthenticationService,
    private util: UtilService,
    private customValidator: CustomValidationService
  ) { }

  ngOnInit() {
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email, this.customValidator.emailValidator()])],
      phone: ['', Validators.required],
      // password: ['', Validators.compose([Validators.required, this.customValidator.passwordValidator()])],
    });
  }

  closeModal(){
    this.popupModal.dismiss({
      'dismissed': true
    });
  }
}
