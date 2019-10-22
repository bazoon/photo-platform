import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
@Component({
  selector: 'app-vk',
  templateUrl: './vk.component.html',
  styleUrls: ['./vk.component.less']
})
export class VkComponent implements OnInit {


  constructor(private route: ActivatedRoute, private api: ApiService) {

  }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      const parts = fragment.split("&").map(p => p.split("="));
      const payload = parts.reduce((acc: any, e) => {
        const key = e[0];
        acc[key] = e[1];
        return acc;
      }, {});

      this.api.post(`api/login-vk`, payload).subscribe(user => {
        console.log(user);
      });

    })




  }

}
