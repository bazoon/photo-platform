import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  checkCookie() {
    const cookie = document.cookie;
    if (cookie) {
      const token = cookie.split('=')[1];
      if (token) {
        return true;
      }
    }
    return false;
  }
}
