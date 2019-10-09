import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CrudComponent } from '../../../shared/crud';
import { Lexicon, emptyLexicon } from '../../../core/types/lexicon';
import { Language } from '../../../core/types/language';
import { Phrase, emptyPhrase } from '../../../core/types/phrase';

@Component({
  selector: 'app-lexicon',
  templateUrl: './lexicon.component.html',
  styleUrls: ['./lexicon.component.less']
})
export class LexiconComponent extends CrudComponent<Lexicon> {
  languages: Array<Language> = [];
  phrases: Array<Phrase> = [];
  currentLexiconId?: number;
  isEditPhraseVisible = false;
  currentPhraseId?: number;
  phraseForm = this.fb.group({
    languageId: [],
    name: []
  });

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
      code: [],
      category: [],
      commentPhrase: []
    });
  }

  find(id: String) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: Lexicon, e2: Lexicon) {
    return e1.id === e2.id;
  }

  editPhrases(id: number) {
    this.currentLexiconId = id;
    return this.api.get<Array<Phrase>>(`api/admin/phrases/${id}`).subscribe(phrases => {
      this.phrases = phrases;
    });
  }

  appendPhrase() {
    this.isEditPhraseVisible = true;
    this.phraseForm.reset();
  }

  editPhrase(phrase: Phrase) {
    this.currentPhraseId = phrase.id;
    this.phraseForm.patchValue(phrase);
    this.isEditPhraseVisible = true;
  }

  handleCancelPhrase() {
    this.isEditPhraseVisible = false;
  }

  handleOkPhrase() {
    if (this.currentPhraseId) {
      return this.api.put<Phrase>(`/api/admin/phrases/${this.currentPhraseId}`, this.phraseForm.value).subscribe(phrase => {
        this.phrases = this.phrases.map(p => {
          if (p.id === phrase.id) {
            return phrase;
          } else {
            return p;
          }
        });

        this.isEditPhraseVisible = false;
        this.currentPhraseId = undefined;
      });
    } else {
      return this.api.post<Phrase>(`/api/admin/phrases/${this.currentLexiconId}`, this.phraseForm.value).subscribe(phrase => {
        this.phrases = this.phrases.concat(phrase);
        this.isEditPhraseVisible = false;
        this.currentPhraseId = undefined;
      }, ({ error }) => {
        console.log(error.error);
      });
    }
  }

  removePhrase(id: number) {
    return this.api.delete<Lexicon>(`/api/admin/phrases/${id}`).subscribe(() => {
      this.phrases = this.phrases.filter(p => p.id !== id);
    });
  }
}
