import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegularTypes {
  get() {
    return [
      {
        id: 0,
        name: 'regular.unregular'
      },
      {
        id: 1,
        name: 'regular.unnormal'
      },
      {
        id: 2,
        name: 'regular.year'
      },
      {
        id: 3,
        name: 'regular.month'
      }
    ];
  }
}