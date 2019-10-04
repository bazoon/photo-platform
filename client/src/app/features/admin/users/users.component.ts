import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { User, emptyUser } from '../../../core/types/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudComponent } from '../../../shared/crud';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent extends CrudComponent<User> {
  getEmptyEntity() {
    return emptyUser;
  }

  getEntities() {
    return this.api.get<Array<User>>("api/admin/users");
  }

  putEntity(id: string, data: any) {
    return this.api.put<User>(`/api/admin/users/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<User>(`/api/admin/users`, data);
  }

  deleteEntity(id: string) {
    return this.api.delete<User>(`/api/admin/users/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      email: [null, [Validators.email, Validators.required]],
      firstName: [''],
      lastName: [],
      nickName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      psw: [null, [Validators.required]],
    });
  }

  find(id: String) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: User, e2: User) {
    return e1.id === e2.id;
  }


}
