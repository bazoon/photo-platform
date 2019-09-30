import { Injectable } from '@angular/core'
import { Router } from '@angular/router';;
import { SignupUser } from '../core/types/signupUser';
import { ApiService } from '../core/services/api.service';
import { User } from '../core/types/user';
import { Login } from '../core/types/login';


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
  user: User = emptyUser;
  isLoggedIn: boolean = false;


  constructor(private api: ApiService, private router: Router) {
    this.load();
  }

  login(loginData: Login) {
    this.api.post<User>('api/login', loginData).subscribe(u => {
      this.user = u;
      this.isLoggedIn = true;
      this.save();
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
    }
  }

  remove() {
    localStorage.removeItem('user');
  }

  logout() {
    console.log('out')
    this.api.postEmpty("api/logout").subscribe(() => {
      this.remove();
      this.isLoggedIn = false;
      this.user = emptyUser;
      this.router.navigate(["/"]);
    });
  }

}
