import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { PublicPublication } from '../../core/types/publicPublication';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.less']
})
export class PublicationsComponent implements OnInit {
  pubs: Array<PublicPublication> = [];
  parentId = '';

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.load(this.translate.currentLang, p.get('id'));
      this.parentId = p.get('id') || '';
    });

    this.translate.onLangChange.subscribe((t: any) => {
      this.route.paramMap.subscribe(p => {
        this.load(this.translate.currentLang, p.get('id'));
        this.parentId = p.get('id') || '';
      });
    });
  }

  load(lang: string, menuId: any) {
    this.api
      .get<Array<PublicPublication>>(`api/publications/${menuId}/${lang}`)
      .subscribe(pubs => {
        this.pubs = pubs;
      });
  }
}
