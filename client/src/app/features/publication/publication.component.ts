import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  PublicPublication,
  emptyPublicPublication
} from '../../core/types/publicPublication';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.less']
})
export class PublicationComponent implements OnInit {
  pub?: PublicPublication = emptyPublicPublication;
  parentId = '';

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.parentId = p.get('parentId') || '';
      this.api
        .get<PublicPublication>(`api/publications/single/${p.get('id')}`)
        .subscribe(pub => {
          this.pub = pub;
        });
    });
  }
}
