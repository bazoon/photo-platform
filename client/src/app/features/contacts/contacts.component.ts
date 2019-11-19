import { Component, OnInit } from '@angular/core';
import { Organizer } from 'src/app/core/types/organizer';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit {
  organizer?: Organizer;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<Organizer>(`api/organizers`).subscribe(organizer => {
      this.organizer = organizer;
    });
  }
}
