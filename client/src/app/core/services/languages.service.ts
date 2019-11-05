import { Injectable } from '@angular/core';
import {ApiService} from 'src/app/core/services/api.service';
import {Language} from 'src/app/core/types/language';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService  {
  languages: Array<Language> = [];

  constructor(private api: ApiService) {
    this.api .get<Array<Language>>('api/admin/languages') .subscribe(languages => {
      this.languages = languages;
    });
  }

}
