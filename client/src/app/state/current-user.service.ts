import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignupUser } from '../core/types/signupUser';
import { User } from '../core/types/user';
import { Login } from '../core/types/login';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'src/app/core/services/cookie.service';
import { HttpClient } from '@angular/common/http';

const emptyUser: User = {
  id: -1,
  firstName: '',
  lastName: '',
  nickName: '',
  avatar: '',
  email: '',
  phone: '',
  userType: -1,
  emailState: -1,
  emailCode: '',
  biography: '',
  awards: '',
  createdAt: new Date(),
  rowState: -1
};

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  user?: User;
  isLoggedIn = false;
  hasLoginError = false;
  _roles: BehaviorSubject<Array<string>> = new BehaviorSubject(['']);
  roles: Observable<Array<string>> = this._roles.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) {
    if (!cookie.checkCookie()) {
      //this.logout();
    } else {
      this.load();
    }
  }

  login(loginData: Login) {
    this.http.post<User>('api/login', loginData).subscribe(
      u => {
        this.user = u;
        this.isLoggedIn = true;
        this.save();
        this.updateRoles();
        this.router.navigate(['/']);
      },
      e => {
        this.hasLoginError = true;
      }
    );
  }

  loginFb(payload: any) {
    this.http.post<User>(`api/login-fb`, payload).subscribe(user => {
      this.user = user;
      this.isLoggedIn = true;
      this.save();
      this.updateRoles();
      this.router.navigate(['/']);
    });
  }

  loginVk(payload: any) {
    this.http.post<User>(`api/login-vk`, payload).subscribe(user => {
      this.user = user;
      this.isLoggedIn = true;
      this.save();
      this.updateRoles();
      this.router.navigate(['/']);
    });
  }

  loginGoogle(payload: any) {
    console.log(payload);
    this.http.post<User>(`api/login-google`, payload).subscribe(user => {
      this.user = user;
      this.isLoggedIn = true;
      this.save();
      this.updateRoles();
      this.router.navigate(['/']);
    });
  }

  register(user: SignupUser) {
    const formData = new FormData();
    for (const f in user) {
      formData.append(f, user[f]);
    }

    this.http.post<User>('api/register', formData).subscribe(u => {
      this.user = u;
      this.isLoggedIn = true;
      this.save();
      this.updateRoles();
      this.router.navigate(['/']);
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
    return this.http.post('api/logout', {}).subscribe(() => {
      this.remove();
      this.isLoggedIn = false;
      this.user = undefined;
      this.updateRoles();
      this.router.navigate(['/login']);
    });
  }

  updateRoles() {
    this.http.get<any>('api/roles').subscribe(
      role => {
        this._roles.next([role.role]);
      },
      () => this._roles.next([])
    );
  }

  getRoles() {
    return of(this.roles);
  }
}
