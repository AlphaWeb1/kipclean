import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
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
    private backendService: BackendService,
    private util: UtilService,
    private customValidator: CustomValidationService
  ) { }

  ngOnInit() {
    this.initUpdateForm();
  }

  get updateFormControl() {
    return this.updateForm.controls;
  }

  onUpdateProfile(){
    this.inProcess = true;

    const payload: User = {
      first_name: this.updateForm.value.firstName,
      surname: this.updateForm.value.lastName,
      email: this.authService.user.value.email,
      phone: this.updateForm.value.phone,
      address: this.updateForm.value.address
    };
    
    this.backendService.updateProfile(payload).subscribe(
      res => {
        this.util.showToast(res.message);
        this.inProcess = false;
        this.authService.storeUser(res.data);
        this.authService.user.next(res.data);
        this.backendService.createNotification({text: `Profile updated successfully.`, url: '/main/tabs/profile', status: "unread"}).subscribe(
          res => this.closeModal(),
          err => {
            this.util.showAlert('Server Error', 'Unable to create notification.');
            this.closeModal()
          }
        );
      }, err => {
        this.util.showAlert(`Server Error`, err.error.message);
        this.inProcess = false;
      }
    );
  }

  private initUpdateForm() {
    this.updateForm = this.fb.group({
      firstName: [this.authService.user.value.first_name, Validators.required],
      lastName: [this.authService.user.value.surname, Validators.required],
      email: [this.authService.user.value.email],
      phone: [this.authService.user.value.phone, Validators.required],
      address: [this.authService.user.value.address ?? '', Validators.required],
      // password: ['', Validators.compose([Validators.required, this.customValidator.passwordValidator()])],
    });
  }

  closeModal(){
    this.popupModal.dismiss({
      'dismissed': true
    });
  }
}
