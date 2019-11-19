import { Component, OnInit } from '@angular/core';
import {ApiService} from 'src/app/core/services/api.service';
import {TranslateService} from '@ngx-translate/core';

interface Rules {
  rules: string;
}

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.less']
})
export class RulesComponent implements OnInit {

  rules?: Rules;

  constructor(private api: ApiService, private translate: TranslateService) {}

  ngOnInit() {
    this.load(this.translate.currentLang);
    this.translate.onLangChange.subscribe((t: any) => {
      this.load(this.translate.currentLang);
    });
  }

  load(lang: string) {
    this.api.get<Rules>(`api/rules/${lang}`).subscribe(r => {
      this.rules = r;
    });
  }
}
