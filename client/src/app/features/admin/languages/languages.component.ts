import { Component } from '@angular/core';
import { Language, emptyLanguage } from '../../../core/types/language';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.less']
})
export class LanguagesComponent {

  languages: Array<Language> = [];
  editedLanguage: Language = emptyLanguage;
  isEditVisible: boolean = false;
  form: FormGroup;


  constructor(private api: ApiService, private fb: FormBuilder) {
    api.get<Array<Language>>("api/admin/languages").subscribe(languages => {
      this.languages = languages;
    });

    this.form = this.fb.group({
      id: [],
      name: [null, []],
      nameDialect: [null, []],
      short: [null, []],
    });

  }

  append() {
    this.editedLanguage = emptyLanguage;
    this.isEditVisible = true;
  }

  edit(id: string) {
    this.editedLanguage = this.languages.find(l => l.id == +id) || emptyLanguage;
    this.isEditVisible = true;
    this.form.patchValue(this.editedLanguage);
  }

  handleOk() {
    this.isEditVisible = false;
    if (this.form.value.id) {
      this.api.put<Language>(`api/admin/languages/${this.form.value.id}`, this.form.value).subscribe(language => {
        this.languages = this.languages.map(l => {
          if (l.id == language.id) {
            return language;
          } else {
            return l;
          }
        })
      });
    } else {
      this.api.post<Language>(`api/admin/languages`, this.form.value).subscribe(language => {
        this.languages.push(language);
      });
    }

  }

  handleCancel() {
    this.isEditVisible = false;
  }

}
