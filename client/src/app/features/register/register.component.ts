import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFile } from 'ng-zorro-antd/upload';
import { CurrentUserService } from '../../state/current-user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  validateForm: FormGroup;
  fileList: UploadFile[] = [];

  constructor(private fb: FormBuilder, private currentUser: CurrentUserService) {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      firstName: [],
      lastName: [],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      agree: [false]
    });
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = [file];
    return false;
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  submitForm(): void {
    const { value } = this.validateForm;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.currentUser.register({ ...value, avatar: this.fileList[0] });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

}
