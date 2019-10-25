import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrentUserService } from '../../state/current-user.service';

const fbLink = `https://www.facebook.com/v4.0/dialog/oauth?scope=email&client_id=521960325035333&redirect_uri=${location.origin}/oauth/fb&state=somestate&response_type=token`;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  validateForm: FormGroup;



  submitForm(): void {
    const { value } = this.validateForm;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.currentUser.login(value);
  }

  constructor(private fb: FormBuilder, private currentUser: CurrentUserService) {
    this.validateForm = this.fb.group({
      nickName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  fbLogin(e: any) {
    e.preventDefault();
    window.location.replace(fbLink);
  }

}
