import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Contest, emptyContest } from '../../core/types/contest';
import { Photowork } from '../../core/types/photowork';

interface ContestInfo {
  contest: Contest,
  photoworks: Array<Photowork>
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent {

  constructor(private api: ApiService) { }

  ngOnInit() {

  }

  next() {

  }

  prev() {

  }




}
