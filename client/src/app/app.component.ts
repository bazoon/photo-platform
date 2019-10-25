import { Component } from '@angular/core';
import { ApiService } from "./core/services/api.service";
import { CurrentUserService } from './state/current-user.service';
import { User } from './core/types/user';
import { TranslateService } from '@ngx-translate/core';
import { ContestMenu } from './core/types/contestMenu';
import { Organizer, emptyOrganizer } from './core/types/organizer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  staticMenu: Array<ContestMenu> = [];
  contestMenus: Array<ContestMenu> = [];
  organizer: Organizer = emptyOrganizer;

  constructor(private api: ApiService, public currentUser: CurrentUserService, private translate: TranslateService) {
    this.translate.use("ru");
    this.loadMenu();
    this.loadFooter();
  }

  loadMenu() {
    this.api.get<Array<ContestMenu>>(`api/staticMenu`).subscribe(menu => {
      this.staticMenu = menu;
    });

    this.api.get<Array<ContestMenu>>(`api/admin/contestMenus/all`).subscribe(contestMenus => {
      this.contestMenus = contestMenus;
    });
  }

  loadFooter() {
    this.api.get<Organizer>(`api/organizers`).subscribe(organizer => {
      this.organizer = organizer;
      console.log(this.organizer)
    });
  }

  logout() {
    this.currentUser.logout();
  }
}
