import { Component, OnInit } from '@angular/core';
import { User, emptyUser } from '../../../core/types/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.less']
})
export class AdminsComponent {
  users: Array<User>;
  editedUser: User = emptyUser;
  isEditVisible: boolean = false;
  form: FormGroup;


  constructor(private api: ApiService, private fb: FormBuilder) {
    this.users = [];

    api.get<Array<User>>("api/users").subscribe(users => {
      this.users = users;
    });

    this.form = this.fb.group({
      id: [],
      email: [null, [Validators.email, Validators.required]],
      firstName: ['mool'],
      lastName: [],
      nickName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });

  }

  edit(id: string) {
    this.editedUser = this.users.find(u => u.id == +id) || emptyUser;
    this.isEditVisible = true;
    this.form.patchValue(this.editedUser);
  }

  handleOk() {
    this.isEditVisible = false;
    this.api.put<User>(`api/users/${this.form.value.id}`, this.form.value).subscribe(user => {
      this.users = this.users.map(u => {
        if (u.id == user.id) {
          return user;
        } else {
          return u;
        }
      })
    });
  }

  handleCancel() {
    this.isEditVisible = false;
  }


}
