import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { User, emptyUser } from '../../../core/types/user';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent {
  users: Array<User>;
  editedUser: User = emptyUser;
  isEditVisible: boolean = false;
  userForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.users = [];

    api.get<Array<User>>("api/users").subscribe(users => {
      this.users = users;
    });

    this.userForm = this.fb.group({
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
    this.userForm.patchValue(this.editedUser);
  }

  handleOk() {
    this.isEditVisible = false;
    this.api.put<User>(`api/users/${this.userForm.value.id}`, this.userForm.value).subscribe(user => {
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
