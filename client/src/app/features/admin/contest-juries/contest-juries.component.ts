import { Component, OnInit } from '@angular/core';
import { CrudComponent } from '../../../shared/crud';
import { ContestJury, emptyContestJury } from '../../../core/types/contestJury';
import { User } from '../../../core/types/user';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-contest-juries',
  templateUrl: './contest-juries.component.html',
  styleUrls: ['./contest-juries.component.less']
})
export class ContestJuriesComponent implements OnInit {
  users: Array<User> = [];
  entities: Array<ContestJury> = [];
  jury: ContestJury = emptyContestJury;
  isEditVisible = false;
  contestId: string | null = '';
  form = this.fb.group({
    id: [],
    userId: [[], []],
    rank: []
  });
  editState = 0;

  constructor(private route: ActivatedRoute, protected fb: FormBuilder, protected api: ApiService) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.contestId = p.get('id');
      this.api.get<Array<ContestJury>>(`api/admin/contestJuries/${p.get('id')}`).subscribe(juries => {
        this.entities = juries;
      });
    });

    this.api.get<Array<User>>('api/admin/users').subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  append() {
    this.isEditVisible = true;
    this.editState = 1;
  }

  edit(id: string) {
    this.isEditVisible = true;
    this.editState = 2;
    this.jury = this.find(id);
    this.form.patchValue(this.jury);
  }

  remove(id: number) {
    return this.api.delete<ContestJury>(`/api/admin/contestJuries/${id}`).subscribe(() => {
      this.entities = this.entities.filter(e => e.id !== id);
    });
  }

  getEmptyEntity() {
    return emptyContestJury;
  }

  find(id: string) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: ContestJury, e2: ContestJury) {
    return e1.id === e2.id;
  }

  handleOk() {
    if (this.editState === 1) {
      this.api.post<ContestJury>(`api/admin/contestJuries/${this.contestId}`, this.form.value).subscribe(jury => {
        this.entities = this.entities.concat([jury]);
        this.isEditVisible = false;
        this.editState = 0;
      });
    } else if (this.editState === 2) {
      this.api.put<ContestJury>(`api/admin/contestJuries/${this.jury.id}`, this.form.value).subscribe(jury => {
        this.entities = this.entities.map(e => {
          if (e.id === jury.id) {
            return jury;
          }
          return e;
        });
        this.isEditVisible = false;
        this.editState = 0;
      });
    }
  }

  handleCancel() {
    this.isEditVisible = false;
  }



}
