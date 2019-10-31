import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CrudComponent } from 'src/app/shared/crud';
import { AwardStack } from 'src/app/core/types/awardStack';
import { AwardType } from 'src/app/core/types/awardType';
import { of } from 'rxjs';

@Component({
  selector: 'app-contest-award-stack',
  templateUrl: './contest-award-stack.component.html',
  styleUrls: ['./contest-award-stack.component.less']
})
export class ContestAwardStackComponent extends CrudComponent<AwardStack>
  implements OnChanges {
  @Input() contestId = -1;
  awardTypes: Array<AwardType> = [];

  ngOnChanges() {
    if (this.contestId > 0) {
      this.loadAwardTypes();
      this.loadStacks();
    }
  }

  loadStacks() {
    this.api
      .get<Array<AwardStack>>(`api/admin/awardStacks/${this.contestId}`)
      .subscribe(entities => {
        this.entities = entities;
      });
  }

  loadAwardTypes() {
    console.log(this.contestId);
    this.api
      .get<Array<AwardType>>('api/admin/awardTypes')
      .subscribe(awardTypes => {
        this.awardTypes = awardTypes;
      });
  }

  getEntities() {
    return of([]);
  }

  putEntity(id: string, data: any) {
    return this.api.put<AwardStack>(`/api/admin/awardStacks/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<AwardStack>(
      `/api/admin/awardStacks/${this.contestId}`,
      data
    );
  }

  deleteEntity(id: string) {
    return this.api.delete<AwardStack>(`/api/admin/awardStacks/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      awardTypeId: [null, []],
      position: [null, []],
      countAwards: [null, []]
    });
  }

  find(id: string) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: AwardStack, e2: AwardStack) {
    return e1.id === e2.id;
  }
}
