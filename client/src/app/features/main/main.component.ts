import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Contest, emptyContest } from '../../core/types/contest';
import { Photowork } from '../../core/types/photowork';
import { TranslateService } from '@ngx-translate/core';

interface About {
  contestName: string;
  saloneName: string;
  years: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  about?: About;

  constructor(private api: ApiService, private translate: TranslateService) {}

  ngOnInit() {
    this.load();
    this.translate.onLangChange.subscribe(() => {
      this.load();
    });
  }

  load() {
    this.api
      .get<About>(`api/contests/about/${this.translate.currentLang}`)
      .subscribe(about => {
        this.about = about;
      });
  }
}
