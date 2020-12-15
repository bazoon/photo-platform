import { Component, OnInit } from '@angular/core';
import { Photowork } from '../../../core/types/photowork';
import { ApiService } from '../../../core/services/api.service';
import { ContestSection } from '../../../core/types/contestSection';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contest-results',
  templateUrl: './contest-results.component.html',
  styleUrls: ['./contest-results.component.less']
})
export class ContestResultsComponent implements OnInit {
  works: Array<Photowork> = [];
  sections: Array<ContestSection> = [];
  currentSection?: ContestSection;
  visibleWorks: Array<Photowork> = [];
  pageSize = 10;
  isImageVisible = false;
  currentImage = '';


  constructor(private api: ApiService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.api.get<Array<ContestSection>>(`api/admin/contestSections/all/${p.get('id')}`).subscribe(sections => {
        this.sections = sections;
      });
    });
  }

  handleChangeSection() {
    this.loadImages();
  }

  loadImages() {
    this.api.get<any>(`api/results/${this.currentSection}`).subscribe(files => {
      this.works = files;
    });
  }

  currentPageDataChange(works: Photowork[]): void {
    this.visibleWorks = works;
  }

  viewImage(image: string) {
    this.currentImage = image;
    this.isImageVisible = true;
  }

}
