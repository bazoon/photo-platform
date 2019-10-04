import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { filter } from 'rxjs/operators';

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

    if (data instanceof FormData) {
      return this.http.post<T>(url, data);
    } else if (typeof data === 'object') {
      return this.http.post<T>(url, JSON.stringify(data), httpOptions);
    } else {
      return this.http.post<T>(url, JSON.stringify(data), httpOptions);
    }
  }

  postEmpty(url: string) {
    return this.http.post(url, "", httpOptions);
  }

  get<T>(url: string) {
    const req = new HttpRequest('GET', url);
    return this.http.get<T>(url);//.pipe(filter(e => e instanceof HttpResponse));
  }

  put<T>(url: string, data: string | FormData | object) {
    if (data instanceof FormData) {
      return this.http.put<T>(url, data);
    } else if (typeof data === 'object') {
      return this.http.put<T>(url, JSON.stringify(data), httpOptions);
    } else {
      return this.http.put<T>(url, JSON.stringify(data), httpOptions);
    }
  }

  delete<T>(url: string) {
    return this.http.delete(url);
  }

}
