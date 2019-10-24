import { Component } from '@angular/core';

import { Award, emptyAward } from '../../../core/types/award';
import { CrudComponent } from '../../../shared/crud';


@Component({
  selector: 'app-awards-stacks',
  templateUrl: './awards-stacks.component.html',
  styleUrls: ['./awards-stacks.component.less']
})
export class AwardsStacksComponent extends CrudComponent<Award> {

  getEmptyEntity() {
    return emptyAward;
  }

  getEntities() {
    return this.api.get<Array<Award>>("api/admin/Awards");
  }

  putEntity(id: string, data: any) {
    return this.api.put<Award>(`/api/admin/Awards/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<Award>(`/api/admin/Awards`, data);
  }

  deleteEntity(id: string) {
    return this.api.delete<Award>(`/api/admin/Awards/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      name: [null, []],
      nameDialect: [null, []],
      short: [null, []],
    });
  }

  find(id: String) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: Award, e2: Award) {
    return e1.id === e2.id;
  }


}
