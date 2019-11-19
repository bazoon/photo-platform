import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

interface About {
  content: string;
  name: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {
  about?: About;

  constructor(public api: ApiService) {}

  ngOnInit() {
    this.api.get<About>('/api/about').subscribe(a => {
      this.about = a;
    });
  }
}
