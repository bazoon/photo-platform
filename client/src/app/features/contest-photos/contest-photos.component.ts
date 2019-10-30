import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

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

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get<Array<Section>>('api/contestPhotos/sections').subscribe(sections => {
      this.sections = sections;
    });
  }

}
