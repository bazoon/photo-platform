import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Contest } from '../../../core/types/contest';
import { ContestSection } from '../../../core/types/contestSection';
import { Photowork } from '../../../core/types/photowork';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.less']
})
export class JuryComponent implements OnInit {
  contests: Array<Contest> = [];
  currentContestId: number = -1;
  currentSection: number = -1;
  currentContest?: Contest;
  sections: Array<ContestSection> = [];
  files: Array<Photowork> = [];
  rates: { [key: string]: number } = {};

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
    this.api.get<Array<Photowork>>(`/api/rates/${this.currentSection}`).subscribe(files => {
      this.files = files;
    });
  }

  handleRateChange(rate: number, id: number) {
    this.api.post(`/api/rates/${id}`, { rate, contestId: this.currentContestId }).subscribe(() => {

    });
  }


}
