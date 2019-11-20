import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ContestSection,
  emptyContestSection
} from '../../../core/types/contestSection';
import { ApiService } from 'src/app/core/services/api.service';
import { CrudComponent } from 'src/app/shared/crud';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LanguagesService } from 'src/app/core/services/languages.service';

interface Translation {
  id: number;
  languageId: number;
  language: string;
  name: string;
}

@Component({
  selector: 'app-contest-sections',
  templateUrl: './contest-sections.component.html',
  styleUrls: ['./contest-sections.component.less']
})
export class ContestSectionsComponent extends CrudComponent<ContestSection>
  implements OnInit {
  contestId = '';
  currentSection?: ContestSection;
  translations: Array<Translation> = [];
  isTranslationEditVisible = false;

  translationForm = this.fb.group({
    id: [],
    languageId: [],
    language: [],
    name: []
  });

  constructor(
    public api: ApiService,
    private route: ActivatedRoute,
    public langService: LanguagesService,
    public fb: FormBuilder
  ) {
    super(fb, api);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.loadSections(p.get('id'));
    });
  }

  /* ngOnChanges() { */
  /*   if (this.contestId > 0) { */
  /*     this.loadSections(); */
  /*   } */
  /* } */

  loadSections(contestId: string | null) {
    this.contestId = contestId || '';
    this.api
      .get<Array<ContestSection>>(
        `api/admin/contestSections/all/${this.contestId}`
      )
      .subscribe(sections => {
        this.entities = sections;
      });
  }

  getEntities() {
    return of([]);
  }

  putEntity(id: string, data: any) {
    return this.api.put<ContestSection>(
      `/api/admin/contestSections/${id}`,
      data
    );
  }

  postEntity(data: any) {
    return this.api.post<ContestSection>(
      `/api/admin/contestSections/${this.contestId}`,
      data
    );
  }

  deleteEntity(id: string) {
    return this.api.delete<ContestSection>(`/api/admin/contestSections/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      maxCountImg: [],
      name: []
    });
  }

  find(id: string) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: ContestSection, e2: ContestSection) {
    return e1.id === e2.id;
  }

  selectSection(section: ContestSection) {
    this.currentSection = section;
    this.api
      .get<Array<Translation>>(
        `/api/admin/contestSections/${section.id}/translations`
      )
      .subscribe(translations => {
        this.translations = translations;
      });
  }

  appendTranslation() {
    this.isTranslationEditVisible = true;
    this.translationForm.reset();
  }

  editTranslation(translation: Translation) {
    this.isTranslationEditVisible = true;
    this.translationForm.patchValue(translation);
  }

  handleCancelTranslation() {
    this.isTranslationEditVisible = false;
  }

  handleOkTranslation() {
    const id = this.translationForm.value.id;
    const sectionId = this.currentSection && this.currentSection.id;
    if (!id) {
      this.api
        .post<Translation>(
          `/api/admin/contestSections/${sectionId}/translations`,
          this.translationForm.value
        )
        .subscribe(translation => {
          this.translations = this.translations.concat(translation);
          this.isTranslationEditVisible = false;
        });
    } else {
      this.api
        .put<Translation>(
          `/api/admin/contestSections/translations/${this.translationForm.value.id}`,
          this.translationForm.value
        )
        .subscribe(translation => {
          this.isTranslationEditVisible = false;
          this.translations = this.translations.map(t => {
            if (t.id === this.translationForm.value.id) {
              return translation;
            }

            return t;
          });
        });
    }
  }

  removeTranslation(id: number) {
    this.api
      .delete(`/api/admin/contestSections/translations/${id}`)
      .subscribe(() => {
        this.translations = this.translations.filter(t => t.id !== id);
      });
  }
}
