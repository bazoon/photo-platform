import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent {
  menu = [
    {
      id: 1,
      name: 'Item1',
      children: [
        {
          id: 11,
          name: 'Item11'
        },
        {
          id: 12,
          name: 'Item12'
        },
      ]
    },
    {
      id: 2,
      name: 'Item2',
      children: [
        {
          id: 21,
          name: 'Item21'
        },
        {
          id: 22,
          name: 'Item22'
        },
      ]
    },
    {
      id: 3,
      name: 'Item3'
    }

  ]

  constructor() { }


  open(id: string) {
    console.log(id);
  }

}
