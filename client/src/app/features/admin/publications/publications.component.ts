import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Language, emptyLanguage } from '../../../core/types/language';
import { CrudComponent } from '../../../shared/crud';
import { Publication, emptyPublication } from '../../../core/types/publication';
import { Observable, of, Subject } from 'rxjs';
import {
  PublicationText,
  emptyPublicationText
} from '../../../core/types/publicationText';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from '../../../core/config/editorConfig';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.less']
})
export class PublicationsComponent implements OnInit {
  @Input() contestMenuId = -1;
  @Input() languages: Array<Language> = [];

  form: FormGroup;
  entities: Array<Publication> = [];
  texts: Array<PublicationText> = [];
  isEditVisible = false;
  currentPubId?: number;
  selectedPubId?: number;
  isTextVisible = false;
  textForm = this.fb.group({
    name: [],
    languageId: [],
    content: [],
    digest: []
  });
  Editor = ClassicEditor;
  ckconfig = editorConfig;
  selectedText?: PublicationText;

  constructor(private api: ApiService, protected fb: FormBuilder) {
    this.form = this.getForm();
  }

  ngOnInit() {
    this.getEntities();
  }

  append() {
    this.isEditVisible = true;
    this.currentPubId = undefined;
    this.form.reset();
  }

  edit(id: number) {
    this.isEditVisible = true;
    const pub = this.find(id);
    this.currentPubId = pub.id;
    this.form.patchValue(pub);
  }

  handleCancel() {
    this.isEditVisible = false;
  }

  handleOk() {
    this.isEditVisible = false;
    if (this.currentPubId) {
      this.putEntity(this.currentPubId, this.form.value).subscribe(pub => {
        this.entities = this.entities.map(p => {
          if (p.id === pub.id) {
            return pub;
          }
          return p;
        });
      });
    } else {
      this.postEntity(this.form.value).subscribe(pub => {
        this.entities = this.entities.concat([pub]);
      });
    }
  }

  getEmptyEntity() {
    return emptyPublication;
  }

  getEntities() {
    this.api
      .get<Array<Publication>>(`api/admin/publications/${this.contestMenuId}`)
      .subscribe(pubs => {
        this.entities = pubs;
      });
  }

  putEntity(id: number, data: any) {
    return this.api.put<Publication>(`/api/admin/publications/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<Publication>(
      `/api/admin/publications/${this.contestMenuId}`,
      data
    );
  }

  deleteEntity(id: string) {
    return this.api.delete<Publication>(`/api/admin/publications/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      dateShow: [],
      visible: [],
      pubtype: [],
      archive: []
    });
  }

  find(id: number) {
    return this.entities.find(e => e.id === id) || this.getEmptyEntity();
  }

  isEqual(e1: Publication, e2: Publication) {
    return e1.id === e2.id;
  }

  loadTexts(id: number) {
    this.selectedPubId = id;
    this.api
      .get<Array<PublicationText>>(`api/admin/publicationTexts/${id}`)
      .subscribe(texts => {
        this.texts = texts;
      });
  }

  appendText() {
    this.isTextVisible = true;
    this.textForm.reset();
    this.selectedText = undefined;
  }

  editText(id: number) {
    this.isTextVisible = true;
    this.selectedText = this.texts.find(t => t.id === id);
    this.textForm.patchValue(this.selectedText || emptyPublicationText);
  }

  handleOkText() {
    if (this.selectedText) {
      this.api
        .put<PublicationText>(
          `/api/admin/publicationTexts/${this.selectedText.id}`,
          this.textForm.value
        )
        .subscribe(text => {
          this.texts = this.texts.map(t => {
            if (t.id === text.id) {
              return text;
            }
            return t;
          });
          this.isTextVisible = false;
        });
    } else {
      this.api
        .post<PublicationText>(
          `/api/admin/publicationTexts/${this.selectedPubId}`,
          this.textForm.value
        )
        .subscribe(text => {
          this.texts = this.texts.concat([text]);
          this.isTextVisible = false;
        });
    }
  }

  handleCancelText() {
    this.isTextVisible = false;
  }

  remove(id: number) {
    this.api.delete(`/api/admin/publications/${id}`).subscribe(() => {
      this.entities = this.entities.filter(e => e.id !== id);
      this.texts = [];
    });
  }

  removeText(id: number) {
    this.api.delete(`/api/admin/publicationTexts/${id}`).subscribe(() => {
      this.texts = this.texts.filter(e => e.id !== id);
    });
  }
}
