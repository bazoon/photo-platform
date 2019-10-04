import { Component, OnInit } from '@angular/core';
import { Admin, emptyAdmin } from '../../../core/types/admin';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { User } from '../../../core/types/user';
import { CrudComponent } from '../../../shared/crud';
import { Organizer } from '../../../core/types/organizer';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.less']
})
export class AdminsComponent extends CrudComponent<Admin> {
  users: Array<User> = [];
  admins: Array<Admin> = [];
  organizers: Array<Organizer> = [];
  idField: string = "userId";
  admTypes = [
    {
      id: 0,
      name: 'Администратор'
    },
    {
      id: 1,
      name: 'Модератор'
    }
  ]

  getEmptyEntity() {
    return emptyAdmin;
  }

  getEntities() {
    this.api.get<Array<User>>("api/admin/users").subscribe(users => {
      this.users = users;
    });

    this.api.get<Array<Organizer>>("api/admin/organizers").subscribe(organizers => {
      this.organizers = organizers;
    });

    return this.api.get<Array<Admin>>("api/admin/admins");
  }

  putEntity(id: string, data: any) {
    return this.api.put<Admin>(`/api/admin/Admins/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<Admin>(`/api/admin/Admins`, data)
  }

  deleteEntity(id: string) {
    return this.api.delete<Admin>(`/api/admin/Admins/${id}`);
  }

  getForm() {
    return this.fb.group(emptyAdmin);
  }

  find(id: String) {
    return this.entities.find(e => e.userId === +id) || this.getEmptyEntity();
  }

  isEqual(e1: Admin, e2: Admin) {
    return e1.userId === e2.userId;
  }

  formatAdminType(type: number) {
    if (type === 0) {
      return "Администратор";
    }
    return "Модератор";
  }

}
