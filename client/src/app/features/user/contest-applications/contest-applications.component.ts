import { Component, OnInit } from '@angular/core';
import { ContestRegistration } from '../../../core/types/contestRegistration';
import { Contest } from '../../../core/types/contest';
import { ApiService } from '../../../core/services/api.service';
import { UserContest } from '../../../core/types/userContest';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-contest-applications',
  templateUrl: './contest-applications.component.html',
  styleUrls: ['./contest-applications.component.less']
})
export class ContestApplicationsComponent implements OnInit {
  contestRegistrations: Array<ContestRegistration> = [];
  contests: Array<UserContest> = [];
  isApplicationVisible = false;
  currentContestId?: number;
  currentSectionCount?: number;
  sectionForm = this.fb.group({
    sectionCount: [0, [Validators.required, Validators.min(1), Validators.max(1)]]
  });

  constructor(private api: ApiService, protected fb: FormBuilder) { }

  ngOnInit() {
    this.api.get<Array<UserContest>>("api/contests").subscribe(contests => {
      this.contests = contests;
    });
  }

  applyForContest(contestId: number, sectionCount: number) {
    this.currentContestId = contestId;
    this.currentSectionCount = sectionCount;

    this.sectionForm = this.fb.group({
      sectionCount: [sectionCount, [Validators.required, Validators.min(1), Validators.max(sectionCount)]]
    });

    this.isApplicationVisible = true;
  }

  handleCancelApplication() {
    this.isApplicationVisible = false;
  }

  handleOkApplication() {
    const payload = {
      contestId: this.currentContestId,
      ...this.sectionForm.value
    };

    this.api.post<UserContest>("api/contestApplications", payload).subscribe(userContest => {
      const contest = this.contests.find(c => c.id === userContest.id);
      if (contest) {
        contest.regState = userContest.regState;
        contest.canApply = userContest.canApply;
        contest.canPostPhotos = userContest.canPostPhotos;
      }
      this.isApplicationVisible = false;
    });
  }

}
