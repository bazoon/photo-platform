import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';


@Component({
  selector: 'app-restore-form',
  templateUrl: './restore-form.component.html',
  styleUrls: ['./restore-form.component.less']
})
export class RestoreFormComponent implements OnInit {
  email: 'foo'

  constructor(private api: ApiService) { }

  ngOnInit() {
    
  }

  submitForm(e) {
    
    this.api
      .post(
        `api/restorePassword`, { email: this.email }
      )
      .subscribe(sections => {});

  }

}
