import { Component } from '@angular/core';
import { ApiService } from "./core/services/api.service";
import { CurrentUserService } from './state/current-user.service';
import { User } from './core/types/user';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(public currentUser: CurrentUserService, private translate: TranslateService) {
    this.translate.use("ru");
  }

  logout() {
    this.currentUser.logout();
  }
}
