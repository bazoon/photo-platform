import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ContestSection,
  emptyContestSection
} from '../../../core/types/contestSection';
import { ApiService } from 'src/app/core/services/api.service';
import { CrudComponent } from 'src/app/shared/crud';
import { of } from 'rxjs';

@Component({
  selector: 'app-contest-sections',
  templateUrl: './contest-sections.component.html',
  styleUrls: ['./contest-sections.component.less']
})
export class ContestSectionsComponent extends CrudComponent<ContestSection>
  implements OnChanges {
  @Input() contestId = -1;

  ngOnChanges() {
    if (this.contestId > 0) {
      this.loadSections();
    }
  }

  loadSections() {
    this.api
      .get<Array<ContestSection>>(
        `api/admin/contestSections/all/${this.contestId}`
      )
      .subscribe(sections => {
        this.entities = sections;
      });
  }

  getEntities() {
    return of([]);
  }

  putEntity(id: string, data: any) {
    return this.api.put<ContestSection>(
      `/api/admin/contestSections/${id}`,
      data
    );
  }

  postEntity(data: any) {
    return this.api.post<ContestSection>(
      `/api/admin/contestSections/${this.contestId}`,
      data
    );
  }

  deleteEntity(id: string) {
    return this.api.delete<ContestSection>(`/api/admin/contestSections/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      maxCountImg: [],
      name: []
    });
  }

  find(id: string) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: ContestSection, e2: ContestSection) {
    return e1.id === e2.id;
  }
}
