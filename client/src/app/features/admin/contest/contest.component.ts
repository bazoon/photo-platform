import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contest, emptyContest } from '../../../core/types/contest';
import { Salone } from '../../../core/types/salone';
import { CrudComponent } from '../../../shared/crud';
import {ApiService} from 'src/app/core/services/api.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.less']
})
export class ContestComponent extends CrudComponent<Contest> {
  Contests: Array<Contest> = [];
  salones: Array<Salone> = [];
  currentContest = emptyContest;

  constructor(protected fb: FormBuilder, protected api: ApiService) {
    super(fb, api);
  }

  getEmptyEntity() {
    return emptyContest;
  }

  getEntities() {
    this.api.get<Array<Salone>>('api/admin/salones').subscribe(salones => {
      this.salones = salones;
    });


    return this.api.get<Array<Contest>>('api/admin/contests');
  }

  putEntity(id: string, data: any) {
    return this.api.put<Contest>(`/api/admin/Contests/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<Contest>(`/api/admin/Contests`, data);
  }

  deleteEntity(id: string) {
    return this.api.delete<Contest>(`/api/admin/Contests/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [null, []],
      saloneId: [null, []],
      subname: [null, []],
      years: [null, []],
      dateStart: [null, []],
      dateStop: [null, []],
      dateJuriEnd: [null, []],
      dateRateShow: [null, []],
      showType: [null, []],
      showRateState: [null, []],
      democraty: [null, []],
      payType: [null, []],
      sectionCount: [null, []],
      maxrate: [null, []],
      maxsize: [null, []],
      maxWeight: [null, []]
    });
  }

  find(id: string) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: Contest, e2: Contest) {
    return e1.id === e2.id;
  }

  loadRelated(id: string) {
    this.currentContest = this.find(id);
  }


}
