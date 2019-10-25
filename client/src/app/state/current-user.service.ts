import { Injectable } from '@angular/core'
import { Router } from '@angular/router';;
import { SignupUser } from '../core/types/signupUser';
import { ApiService } from '../core/services/api.service';
import { User } from '../core/types/user';
import { Login } from '../core/types/login';
import { of, Observable, BehaviorSubject } from 'rxjs';


const emptyUser: User = {
  id: -1,
  firstName: "",
  lastName: "",
  nickName: "",
  avatar: "",
  email: "",
  phone: "",
  userType: -1,
  emailState: -1,
  emailCode: "",
  biography: "",
  awards: "",
  createdAt: new Date(),
  rowState: -1,
};


@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  user?: User;
  isLoggedIn: boolean = false;
  _roles: BehaviorSubject<Array<string>> = new BehaviorSubject([""]);
  roles: Observable<Array<string>> = this._roles.asObservable();

  constructor(private api: ApiService, private router: Router) {
    this.load();
  }

  login(loginData: Login) {
    this.api.post<User>('api/login', loginData).subscribe(u => {
      this.user = u;
      this.isLoggedIn = true;
      this.save();
      this.updateRoles();
      this.router.navigate(["/"]);
    });
  }

  loginFb(payload: any) {
    this.api.post<User>(`api/login-fb`, payload).subscribe(user => {
      this.user = user;
      this.isLoggedIn = true;
      this.save();
      this.updateRoles();
      this.router.navigate(["/"]);
    });
  }

  loginVk(payload: any) {
    this.api.post<User>(`api/login-vk`, payload).subscribe(user => {
      this.user = user;
      this.isLoggedIn = true;
      this.save();
      this.updateRoles();
      this.router.navigate(["/"]);
    });
  }

  register(user: SignupUser) {
    const formData = new FormData();
    for (let f in user) {
      formData.append(f, user[f]);
    }

    this.api.post<User>("api/register", formData).subscribe(u => {
      this.user = u;
      this.isLoggedIn = true;
      this.save();
      this.updateRoles();
      this.router.navigate(["/"]);
    });
  }

  save() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  load() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isLoggedIn = true;
      this.updateRoles();
    }
  }

  remove() {
    localStorage.removeItem('user');
  }

  logout() {
    this.api.postEmpty("api/logout").subscribe(() => {
      this.remove();
      this.isLoggedIn = false;
      this.user = undefined;
      this.updateRoles();
      this.router.navigate(["/"]);
    });
  }

  updateRoles() {
    this.api.get<any>('api/roles').subscribe(role => {
      this._roles.next([role.role]);
    });
  }

  getRoles() {
    return of(this.roles);
  }

}
