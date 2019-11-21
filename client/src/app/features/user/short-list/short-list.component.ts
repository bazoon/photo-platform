import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Contest } from '../../../core/types/contest';
import { ContestSection } from '../../../core/types/contestSection';
import { Photowork } from '../../../core/types/photowork';
import { AwardStack } from '../../../core/types/awardStack';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-short-list',
  templateUrl: './short-list.component.html',
  styleUrls: ['./short-list.component.less']
})
export class ShortListComponent implements OnInit {
  contests: Array<Contest> = [];
  currentContestId = -1;
  currentSection = 1;
  currentContest?: Contest;
  sections: Array<ContestSection> = [];
  files: Array<Photowork> = [];
  isImageVisible = false;
  currentImage = '';
  awardsStacks: Array<AwardStack> = [];

  constructor(private api: ApiService, private translate: TranslateService) {}

  ngOnInit() {
    this.api.get<Array<Contest>>('/api/contests').subscribe(contests => {
      this.contests = contests;
    });

    this.translate.onLangChange.subscribe(() => {
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
        if (sections.length > 0) {
          this.handleChangeSection();
        }
      });

    this.loadAwardsStacks();
  }

  loadAwardsStacks() {
    this.api
      .get<Array<AwardStack>>(`api/awardsStacks/${this.currentContestId}`)
      .subscribe(awardsStacks => {
        this.awardsStacks = awardsStacks;
      });
  }

  handleChangeSection() {
    this.api
      .get<Array<Photowork>>(`/api/shortLists/${this.currentSection}`)
      .subscribe(files => {
        this.files = files;
      });
  }

  viewImage(image: string) {
    this.currentImage = image;
    this.isImageVisible = true;
  }

  handleAwardChange(file: Photowork) {
    if (file.awardsStackId) {
      this.updateAward(file);
    } else {
      this.removeReward(file);
    }
  }

  updateAward(file: Photowork) {
    this.api
      .put('/api/awardsStacks', {
        id: file.id,
        awardsStackId: file.awardsStackId
      })
      .subscribe(() => {
        this.loadAwardsStacks();
      });
  }

  removeReward(file: Photowork) {
    this.api.delete(`/api/awardsStacks/${file.id}`).subscribe(() => {
      this.loadAwardsStacks();
    });
  }
}
