import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CrudComponent } from '../../../shared/crud';
import { ContestMenu, emptyContestMenu } from '../../../core/types/contestMenu';

@Component({
  selector: 'app-contest-menu',
  templateUrl: './contest-menu.component.html',
  styleUrls: ['./contest-menu.component.less']
})
export class ContestMenuComponent extends CrudComponent<ContestMenu> {

  getEmptyEntity() {
    return emptyContestMenu;
  }

  getEntities() {
    return this.api.get<Array<ContestMenu>>("api/admin/contestMenus");
  }

  putEntity(id: string, data: any) {
    return this.api.put<ContestMenu>(`/api/admin/contestMenus/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<ContestMenu>(`/api/admin/contestMenus`, data);
  }

  deleteEntity(id: string) {
    return this.api.delete<ContestMenu>(`/api/admin/contestMenus/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      contestId: [],
      position: [],
      parentId: []
    });
  }

  find(id: String) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: ContestMenu, e2: ContestMenu) {
    return e1.id === e2.id;
  }


}
