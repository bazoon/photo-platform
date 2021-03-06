import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {
  token: string;
  password: string;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.token = p.get('token');
    });
  }

  submitForm() {
    this.api
      .post(
        `api/changePassword`, { password: this.password, token: this.token }
      )
      .subscribe(() => {});
  }

}
