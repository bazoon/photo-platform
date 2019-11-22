import { Component } from '@angular/core';
import { Salone, emptySalone } from '../../../core/types/salone';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CrudComponent } from '../../../shared/crud';
import { Observable } from 'rxjs';
import { Organizer } from '../../../core/types/organizer';
import { SaloneType } from '../../../core/types/saloneType';
import { SaloneAbout, emptySaloneAbout } from '../../../core/types/saloneAbout';
import { Language } from '../../../core/types/language';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RegularTypes } from '../../../core/services/regularTypes';
import { PrivateTypes } from '../../../core/services/privateTypes';
import {
  UploadAdapter,
  TheUploadAdapterPlugin
} from '../../../core/misc/uploadAdapter';
import editorConfig from '../../../core/config/editorConfig';

@Component({
  selector: 'app-salone',
  templateUrl: './salone.component.html',
  styleUrls: ['./salone.component.less']
})
export class SaloneComponent extends CrudComponent<Salone> {
  organizers: Array<Organizer> = [];
  saloneTypes: Array<SaloneType> = [];
  regularTypes: Array<any>;
  privateTypes: Array<any>;
  isAboutVisible = false;
  content = '';
  aboutForm: FormGroup = this.fb.group({
    id: [],
    name: [null, []],
    languageId: null,
    content: ''
  });
  abouts: Array<SaloneAbout> = [];
  languages: Array<Language> = [];
  currentSalone = emptySalone;
  isEditingAbout = 0;
  editingAbout = emptySaloneAbout;
  isAboutsLoading = false;
  Editor = ClassicEditor;
  ckconfig = editorConfig;

  constructor(
    protected fb: FormBuilder,
    protected api: ApiService,
    rt: RegularTypes,
    pt: PrivateTypes
  ) {
    super(fb, api);
    this.regularTypes = rt.get();
    this.privateTypes = pt.get();
  }

  getEmptyEntity() {
    return emptySalone;
  }

  getEntities() {
    this.api
      .get<Array<Organizer>>('api/admin/organizers')
      .subscribe(organizers => {
        this.organizers = organizers;
      });

    this.api
      .get<Array<SaloneType>>('api/admin/saloneTypes')
      .subscribe(saloneTypes => {
        this.saloneTypes = saloneTypes;
      });

    this.api
      .get<Array<Language>>('api/admin/languages')
      .subscribe(languages => {
        this.languages = languages;
      });

    return this.api.get<Array<Salone>>('api/admin/salones');
  }

  putEntity(id: string, data: any) {
    return this.api.put<Salone>(`/api/admin/salones/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<Salone>(`/api/admin/salones`, data);
  }

  deleteEntity(id: string) {
    return this.api.delete<Salone>(`/api/admin/salones/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      name: [null, []],
      sprSaloneTypeId: [null, []],
      organizerId: [null, []],
      regular: [null, []],
      private: [null, []],
      domain: [null, []],
      designCode: [null, []],
      rowState: [null, []]
    });
  }

  find(id: String) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: Salone, e2: Salone) {
    return e1.id === e2.id;
  }

  loadAbout(id: string) {
    this.currentSalone = this.find(id);
    this.isAboutsLoading = true;
    this.api
      .get<Array<SaloneAbout>>(`api/admin/salonesAbout/all/${id}`)
      .subscribe(abouts => {
        this.abouts = abouts;
        this.isAboutsLoading = false;
      });
  }

  appendAbout() {
    this.editingAbout = emptySaloneAbout;
    this.isAboutVisible = true;
    this.isEditingAbout = 1;
    this.aboutForm.patchValue(emptySaloneAbout);
  }

  editAbout(id: string) {
    this.editingEntity = this.find(id);
    this.isEditingAbout = 2;
    this.isAboutVisible = true;
    this.api
      .get<SaloneAbout>(`/api/admin/salonesAbout/${id}`)
      .subscribe(about => {
        this.editingAbout = about;
        this.aboutForm.patchValue(this.editingAbout);
      });
  }

  handleCancelAbout() {
    this.isAboutVisible = false;
  }

  handleOkAbout() {
    const payload = {
      ...this.aboutForm.value,
      saloneId: this.currentSalone && this.currentSalone.id
    };
    this.isAboutVisible = false;

    if (this.isEditingAbout === 1) {
      this.api
        .post<SaloneAbout>(
          `/api/admin/salonesAbout/${this.currentSalone.id}`,
          payload
        )
        .subscribe(about => {
          this.abouts = this.abouts.concat([about]);
        });
    } else if (this.isEditingAbout === 2) {
      this.api
        .put<SaloneAbout>(
          `/api/admin/salonesAbout/${this.editingAbout.id}`,
          payload
        )
        .subscribe(about => {
          this.abouts = this.abouts.map(a => {
            if (a.id === about.id) {
              return about;
            }

            return a;
          });
        });
    }
  }

  removeAbout(id: number) {
    this.api.delete(`/api/admin/salonesAbout/${id}`).subscribe(() => {
      this.abouts = this.abouts.filter(a => a.id !== id);
    });
  }

  getRegularType(id: number) {
    return this.regularTypes[id].name;
  }

  getPrivateType(id: number) {
    return this.privateTypes[id].name;
  }
}
