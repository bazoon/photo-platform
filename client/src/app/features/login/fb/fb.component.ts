import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CurrentUserService } from '../../../state/current-user.service';

@Component({
  selector: 'app-fb',
  templateUrl: './fb.component.html',
  styleUrls: ['./fb.component.less']
})
export class FbComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private currentUser: CurrentUserService) { }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      const parts = fragment.split("&").map(p => p.split("="));
      const payload = parts.reduce((acc: any, e) => {
        const key = e[0];
        acc[key] = e[1];
        return acc;
      }, {});
      this.currentUser.loginFb(payload);
    });
  }
}
