import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';

interface Thesis {
  thesis: string;
}

@Component({
  selector: 'app-thesis',
  templateUrl: './thesis.component.html',
  styleUrls: ['./thesis.component.less']
})
export class ThesisComponent implements OnInit {
  thesis?: Thesis;

  constructor(private api: ApiService, private translate: TranslateService) {}

  ngOnInit() {
    this.load(this.translate.currentLang);
    this.translate.onLangChange.subscribe((t: any) => {
      this.load(this.translate.currentLang);
    });
  }

  load(lang: string) {
    this.api.get<Thesis>(`api/thesis/${lang}`).subscribe(t => {
      this.thesis = t;
    });
  }
}
