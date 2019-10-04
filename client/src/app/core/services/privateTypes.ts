import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrivateTypes {
  get() {
    return [
      {
        id: 0,
        name: 'private.forall'
      },
      {
        id: 1,
        name: 'private.invites'
      },
    ];
  }
}