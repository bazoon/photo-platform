import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Contest } from '../../../core/types/contest';
import { ContestSection } from '../../../core/types/contestSection';
import { Photowork } from '../../../core/types/photowork';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-jury',
  templateUrl: './jury.component.html',
  styleUrls: ['./jury.component.less']
})
export class JuryComponent implements OnInit {
  contests: Array<Contest> = [];
  currentContestId = -1;
  currentSection = -1;
  currentContest?: Contest;
  sections: Array<ContestSection> = [];
  files: Array<Photowork> = [];
  rates: { [key: string]: number } = {};
  isImageVisible = false;
  currentImage = '';

  constructor(private api: ApiService, private translate: TranslateService) {}

  ngOnInit() {
    this.api.get<Array<Contest>>('/api/contests').subscribe(contests => {
      this.contests = contests;
    });

    this.translate.onLangChange.subscribe((t: any) => {
      this.api
        .get<Array<ContestSection>>(
          `api/contestSections/all/${this.currentContestId}/${this.translate.currentLang}`
        )
        .subscribe(sections => {
          this.sections = sections;
        });
    });
  }

  handleChangeContest() {
    this.currentContest = this.contests.find(
      c => c.id === this.currentContestId
    );
    this.api
      .get<Array<ContestSection>>(
        `/api/contestSections/all/${this.currentContestId}/${this.translate.currentLang}`
      )
      .subscribe(sections => {
        this.sections = sections;
      });
  }

  handleChangeSection() {
    this.api
      .get<Array<Photowork>>(`/api/rates/${this.currentSection}`)
      .subscribe(files => {
        this.files = files;
      });
  }

  handleRateChange(rate: number, id: number) {
    this.api
      .post(`/api/rates/${id}`, { rate, contestId: this.currentContestId })
      .subscribe(() => {});
  }

  viewImage(image: string) {
    this.currentImage = image;
    this.isImageVisible = true;
  }
}
