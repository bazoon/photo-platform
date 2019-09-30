import { Component } from '@angular/core';
import { Organizer, emptyOrganizer } from '../../../core/types/organizer';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Language, emptyLanguage } from '../../../core/types/language';

@Component({
  selector: 'app-organizers',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.less']
})
export class OrganizersComponent {
  organizers: Array<Organizer> = [];
  languages: Array<Language> = [];
  editedOrganizer: Organizer = emptyOrganizer;
  isEditVisible: boolean = false;
  form: FormGroup;


  constructor(private api: ApiService, private fb: FormBuilder) {
    api.get<Array<Organizer>>("api/admin/organizers").subscribe(organizers => {
      this.organizers = organizers;
    });

    api.get<Array<Language>>("api/admin/languages").subscribe(languages => {
      this.languages = languages;
    });

    this.form = this.fb.group(emptyOrganizer);
  }

  append() {
    this.editedOrganizer = emptyOrganizer;
    this.isEditVisible = true;
  }

  edit(id: string) {
    this.editedOrganizer = this.organizers.find(l => l.id == +id) || emptyOrganizer;
    console.log(this.organizers)
    this.isEditVisible = true;
    this.form.patchValue(this.editedOrganizer);
  }

  handleOk() {
    this.isEditVisible = false;
    if (this.form.value.id) {
      this.api.put<Organizer>(`api/admin/organizers/${this.form.value.id}`, this.form.value).subscribe(Organizer => {
        this.organizers = this.organizers.map(l => {
          if (l.id == Organizer.id) {
            return Organizer;
          } else {
            return l;
          }
        })
      });
    } else {
      this.api.post<Organizer>(`api/admin/organizers`, this.form.value).subscribe(Organizer => {
        this.organizers.push(Organizer);
      });
    }

  }

  handleCancel() {
    this.isEditVisible = false;
  }


}
