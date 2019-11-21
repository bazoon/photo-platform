import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { ContestSection } from 'src/app/core/types/contestSection';

interface Section {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-contest-photos',
  templateUrl: './contest-photos.component.html',
  styleUrls: ['./contest-photos.component.less']
})
export class ContestPhotosComponent implements OnInit {
  sections: Array<Section> = [];

  constructor(private api: ApiService, private translate: TranslateService) {}

  ngOnInit() {
    this.load();
    this.translate.onLangChange.subscribe(() => this.load());
  }

  load() {
    this.api
      .get<Array<Section>>(
        `api/contestPhotos/sections/${this.translate.currentLang}`
      )
      .subscribe(sections => {
        this.sections = sections;
      });
  }
}
