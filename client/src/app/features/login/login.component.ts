import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrentUserService } from '../../state/current-user.service';

const googleId =
  '1051258655371-avvqdidjqst2lr3j9fl5b5mtib5v8e9i.apps.googleusercontent.com';

const fbLink = `https://www.facebook.com/v9.0/dialog/oauth?scope=email&client_id=3530004347107670&redirect_uri=${location.origin}/oauth/fb&state=somestate&response_type=token`;

const vkLink = `https://oauth.vk.com/authorize?scope=email&client_id=7176269&display=page&redirect_uri=${location.origin}/oauth/vk?scope=email&response_type=token&v=5.59`;

const googleLink = `https://accounts.google.com/o/oauth2/auth?client_id=${googleId}&redirect_uri=${location.origin}/oauth/google&&scope=profile email&response_type=token`;

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

  constructor(private fb: FormBuilder, public currentUser: CurrentUserService) {
    this.validateForm = this.fb.group({
      nickName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  vkLogin(e: any) {
    e.preventDefault();
    window.location.replace(vkLink);
  }

  fbLogin(e: any) {
    e.preventDefault();
    window.location.replace(fbLink);
  }

  googleLogin(e: any) {
    e.preventDefault();
    window.location.replace(googleLink);
  }
}
