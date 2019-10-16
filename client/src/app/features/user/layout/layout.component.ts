import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class UserLayoutComponent implements OnInit {
  menu: Array<{ name: string, url: string }> = []
  constructor(protected api: ApiService) { }

  ngOnInit() {
    this.api.get<Array<{ name: string, url: string }>>("/api/userMenu").subscribe(menu => {
      this.menu = menu;
    });
  }

}
