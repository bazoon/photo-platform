import { Component } from '@angular/core';
import { Organizer, emptyOrganizer } from '../../../core/types/organizer';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Language, emptyLanguage } from '../../../core/types/language';
import { CrudComponent } from '../../../shared/crud';


@Component({
  selector: 'app-organizers',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.less']
})
export class OrganizersComponent extends CrudComponent<Organizer> {
  languages: Array<Language> = [];

  getEmptyEntity() {
    return emptyOrganizer;
  }

  getEntities() {
    this.api.get<Array<Language>>("api/admin/languages").subscribe(languages => {
      this.languages = languages;
    });
    return this.api.get<Array<Organizer>>("api/admin/Organizers");
  }

  putEntity(id: string, data: any) {
    return this.api.put<Organizer>(`/api/admin/Organizers/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<Organizer>(`/api/admin/Organizers`, data);
  }

  deleteEntity(id: string) {
    return this.api.delete<Organizer>(`/api/admin/Organizers/${id}`);
  }

  getForm() {
    return this.fb.group(emptyOrganizer);
  }

  find(id: String) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: Organizer, e2: Organizer) {
    return e1.id === e2.id;
  }


}
