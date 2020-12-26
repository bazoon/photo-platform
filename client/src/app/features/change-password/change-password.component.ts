import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less']
})
export class ChangePasswordComponent implements OnInit {
  id: string;
  hash: string

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.id = p.get('id');
      this.hash = p.get('hash');
    });
  }

  send() {
    console.log('send');
  }

}
