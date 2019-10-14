import { Component } from '@angular/core';
import { ApiService } from "./core/services/api.service";
import { CurrentUserService } from './state/current-user.service';
import { User } from './core/types/user';
import { TranslateService } from '@ngx-translate/core';
import { ContestMenu } from './core/types/contestMenu';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  contestMenus: Array<ContestMenu> = [];

  constructor(private api: ApiService, public currentUser: CurrentUserService, private translate: TranslateService) {
    this.translate.use("ru");
    this.loadMenu();
  }

  loadMenu() {
    this.api.get<Array<ContestMenu>>(`api/admin/contestMenus/all/${1}`).subscribe(contestMenus => {
      this.contestMenus = contestMenus;
    });
  }

  logout() {
    this.currentUser.logout();
  }
}
