import { Component } from '@angular/core';
import { Language, emptyLanguage } from '../../../core/types/language';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CrudComponent } from '../../../shared/crud';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.less']
})
export class LanguagesComponent extends CrudComponent<Language>{

  getEmptyEntity() {
    return emptyLanguage;
  }

  getEntities() {
    return this.api.get<Array<Language>>("api/admin/languages");
  }

  putEntity(id: string, data: any) {
    return this.api.put<Language>(`/api/admin/languages/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<Language>(`/api/admin/languages`, data);
  }

  deleteEntity(id: string) {
    return this.api.delete<Language>(`/api/admin/languages/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      name: [null, []],
      nameDialect: [null, []],
      short: [null, []],
    });
  }

  find(id: String) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: Language, e2: Language) {
    return e1.id === e2.id;
  }


}
