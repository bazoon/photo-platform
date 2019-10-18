import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Contest } from '../../../core/types/contest';
import { ContestSection } from '../../../core/types/contestSection';
import { Photowork } from '../../../core/types/photowork';

@Component({
  selector: 'app-short-list',
  templateUrl: './short-list.component.html',
  styleUrls: ['./short-list.component.less']
})
export class ShortListComponent implements OnInit {
  contests: Array<Contest> = [];
  currentContestId: number = -1;
  currentSection: number = -1;
  currentContest?: Contest;
  sections: Array<ContestSection> = [];
  files: Array<Photowork> = [];
  isImageVisible = false;
  currentImage = "";

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get<Array<Contest>>("/api/contests").subscribe(contests => {
      this.contests = contests;
    });
  }

  handleChangeContest() {
    this.currentContest = this.contests.find(c => c.id === this.currentContestId);
    console.log(this.currentContest);
    this.api.get<Array<ContestSection>>(`/api/contestSections/all/${this.currentContestId}`).subscribe(sections => {
      this.sections = sections;
    });
  }

  handleChangeSection() {
    this.api.get<Array<Photowork>>(`/api/shortLists/${this.currentSection}`).subscribe(files => {
      this.files = files;
    });
  }

  viewImage(image: string) {
    this.currentImage = image;
    this.isImageVisible = true;
  }

}
