import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CrudComponent } from '../../../shared/crud';
import { Lexicon, emptyLexicon } from '../../../core/types/lexicon';
import { Language } from '../../../core/types/language';


@Component({
  selector: 'app-lexicon',
  templateUrl: './lexicon.component.html',
  styleUrls: ['./lexicon.component.less']
})
export class LexiconComponent extends CrudComponent<Lexicon> {
  languages: Array<Language> = [];

  getEmptyEntity() {
    return emptyLexicon;
  }

  getEntities() {
    this.api.get<Array<Language>>("api/admin/languages").subscribe(languages => {
      this.languages = languages;
    });

    return this.api.get<Array<Lexicon>>("api/admin/lexicons");
  }

  putEntity(id: string, data: any) {
    return this.api.put<Lexicon>(`/api/admin/lexicons/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<Lexicon>(`/api/admin/lexicons`, data);
  }

  deleteEntity(id: string) {
    return this.api.delete<Lexicon>(`/api/admin/lexicons/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      languageId: [],
      code: [],
      name: [],
      category: [],
    });
  }

  find(id: String) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: Lexicon, e2: Lexicon) {
    return e1.id === e2.id;
  }



}
