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
  contest: Contest = emptyContest;
  photoworks: Array<Photowork> = [];
  image?: string;
  currentImage = 0;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get<ContestInfo>("api/contests/results").subscribe(({ contest, photoworks }) => {
      this.contest = contest;
      this.photoworks = photoworks;
      this.image = this.photoworks[this.currentImage].filename;
    });
  }

  next() {

    this.currentImage = (this.currentImage + 1) % this.photoworks.length;
    this.image = this.photoworks[this.currentImage].filename;
  }

  prev() {
    this.currentImage = (this.currentImage - 1);
    if (this.currentImage < 0) {
      this.currentImage = this.photoworks.length - 1;
    }
    this.image = this.photoworks[this.currentImage].filename;
  }




}
