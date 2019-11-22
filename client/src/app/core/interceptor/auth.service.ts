import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/state/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {
  foo = 0;
  constructor(private router: Router, private currentUser: CurrentUserService) {
    this.foo = 1;
    console.log(currentUser, this.currentUser);
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      //this.currentUser.logout();
      console.log(this.foo);
    }

    return throwError(error);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.handleError));
  }
}
