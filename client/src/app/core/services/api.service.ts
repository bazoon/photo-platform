import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post<T>(url: string, data: string | FormData | object) {
    /* if (!this.currentUser.isLoggedIn) { */
    /*   return; */
    /* } */

    if (data instanceof FormData) {
      return this.http.post<T>(url, data);
    } else if (typeof data === 'object') {
      return this.http.post<T>(url, JSON.stringify(data), httpOptions);
    } else {
      return this.http.post<T>(url, JSON.stringify(data), httpOptions);
    }
  }

  postEmpty(url: string) {
    /* if (!this.currentUser.isLoggedIn) { */
    /*   return; */
    /* } */
    return this.http.post(url, '', httpOptions);
  }

  get<T>(url: string) {
    /* if (!this.currentUser.isLoggedIn) { */
    /*   return; */
    /* } */
    return this.http.get<T>(url);
  }

  put<T>(url: string, data: string | FormData | object) {
    /* if (!this.currentUser.isLoggedIn) { */
    /*   return; */
    /* } */
    if (data instanceof FormData) {
      return this.http.put<T>(url, data);
    } else if (typeof data === 'object') {
      return this.http.put<T>(url, JSON.stringify(data), httpOptions);
    } else {
      return this.http.put<T>(url, JSON.stringify(data), httpOptions);
    }
  }

  delete<T>(url: string) {
    /* if (!this.currentUser.isLoggedIn) { */
    /*   return; */
    /* } */
    return this.http.delete(url);
  }

}
