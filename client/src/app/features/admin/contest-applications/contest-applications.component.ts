import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { ContestRegistration } from '../../../core/types/contestRegistration';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-contest-applications',
  templateUrl: './contest-applications.component.html',
  styleUrls: ['./contest-applications.component.less']
})
export class ContestApplicationsComponent implements OnInit {
  @Input() contestId: number = -1;
  applications: Array<ContestRegistration> = [];

  constructor(private api: ApiService) { }

  ngOnInit() { }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.contestId > 0) {
      this.api.get<Array<ContestRegistration>>(`api/admin/contestApplications/${this.contestId}`).subscribe(applications => {
        this.applications = applications;
      });
    }
  }

  approve(id: number) {
    this.api.post<ContestRegistration>(`api/admin/contestApplications/approves/${id}`, {}).subscribe(application => {
      this.applications = this.applications.map(a => {
        if (a.id == application.id) {
          return { ...a, regState: application.regState };
        }
        return a;
      })
    });
  }

  decline(id: number) {
    this.api.post<ContestRegistration>(`api/admin/contestApplications/declines/${id}`, {}).subscribe(application => {
      this.applications = this.applications.map(a => {
        if (a.id == application.id) {
          return { ...a, regState: application.regState };
        }
        return a;
      })
    });
  }

}
