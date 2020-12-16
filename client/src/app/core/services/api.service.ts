import { Injectable, Injector } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/state/current-user.service';
import { CookieService } from 'src/app/core/services/cookie.service';
import { catchError, share } from 'rxjs/operators';
import { of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService,
    private currentUser: CurrentUserService
  ) {}

  post<T>(url: string, data: string | FormData | object) {
    let result;

    if (data instanceof FormData) {
      // Используем share чтобы subscribe можно было вызывать дважды
      result = this.http.post<T>(url, data).pipe(share());
    } else if (typeof data === 'object') {
      result = this.http
        .post<T>(url, JSON.stringify(data), httpOptions)
        .pipe(share());
    } else {
      result = this.http
        .post<T>(url, JSON.stringify(data), httpOptions)
        .pipe(share());
    }

    result.subscribe(() => {}, e => this.errorHandler(e));
    return result;
  }

  postEmpty(url: string) {
    const result = this.http.post(url, '', httpOptions).pipe(share());
    result.subscribe(() => {}, e => this.errorHandler(e));
    return result;
  }

  get<T>(url: string) {
    const result = this.http.get<T>(url).pipe(share());
    result.subscribe(() => {}, e => this.errorHandler(e));
    return result;
  }

  put<T>(url: string, data: string | FormData | object) {
    let result;
    if (data instanceof FormData) {
      result = this.http.put<T>(url, data);
    } else if (typeof data === 'object') {
      result = this.http
        .put<T>(url, JSON.stringify(data), httpOptions)
        .pipe(share());
    } else {
      result = this.http
        .put<T>(url, JSON.stringify(data), httpOptions)
        .pipe(share());
    }

    result.subscribe(() => {}, e => this.errorHandler(e));
    return result;
  }

  delete<T>(url: string) {
    return this.http.delete(url).pipe(share());
    // result.subscribe(() => {}, e => this.errorHandler(e));
    // return result;
  }

  errorHandler(e: HttpErrorResponse) {
    if (e.status === 401 || !this.cookie.checkCookie()) {
      this.currentUser.logout();
    }
    return of();
  }
}
