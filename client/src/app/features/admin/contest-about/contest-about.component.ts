import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {
  ContestAbout,
  emptyContestAbout
} from '../../../core/types/contestAbout';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from '../../../core/config/editorConfig';
import { FormGroup, FormBuilder } from '@angular/forms';
import {ApiService} from 'src/app/core/services/api.service';
import {LanguagesService} from 'src/app/core/services/languages.service';


@Component({
  selector: 'app-contest-about',
  templateUrl: './contest-about.component.html',
  styleUrls: ['./contest-about.component.less']
})
export class ContestAboutComponent implements OnChanges {
  @Input() contestId = -1;
  Editor = ClassicEditor;
  ckconfig = editorConfig;
  isAboutVisible = false;
  isAboutsLoading = false;
  isEditingAbout = 0;
  editingAbout!: ContestAbout;
  abouts: Array<ContestAbout>  = [];

  aboutForm: FormGroup = this.fb.group({
      id: [],
      name: [null, []],
      languageId: null,
      thesis: '',
      rules: ''
  });


  constructor(protected fb: FormBuilder, protected api: ApiService, public langService: LanguagesService) {
  }

  ngOnChanges() {
    if (this.contestId > 0) {
      this.loadAbouts();
    }
  }


  loadAbouts() {
      this.isAboutsLoading = true;
      this.api
      .get<Array<ContestAbout>>(`api/admin/contestsAbout/all/${this.contestId}`)
      .subscribe(abouts => {
          this.abouts = abouts;
          this.isAboutsLoading = false;
      });
  }


  appendAbout() {
      this.editingAbout = emptyContestAbout;
      this.isAboutVisible = true;
      this.isEditingAbout = 1;
      this.aboutForm.patchValue(emptyContestAbout);
  }

  editAbout(id: string) {
      this.isEditingAbout = 2;
      this.isAboutVisible = true;
      this.api
      .get<ContestAbout>(`/api/admin/ContestsAbout/${id}`)
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
          ContestId: this.contestId
      };
      this.isAboutVisible = false;

      if (this.isEditingAbout === 1) {
          this.api
          .post<ContestAbout>(
              `/api/admin/ContestsAbout/${this.contestId}`,
              payload
          )
          .subscribe(about => {
              this.abouts = this.abouts.concat([about]);
          });
      } else if (this.isEditingAbout === 2) {
          this.api
          .put<ContestAbout>(
              `/api/admin/ContestsAbout/${this.editingAbout.id}`,
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
      this.api.delete(`/api/admin/ContestsAbout/${id}`).subscribe(() => {
          this.abouts = this.abouts.filter(a => a.id !== id);
      });
  }

}
