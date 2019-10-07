import { Component, OnInit } from '@angular/core';
import { CrudComponent } from '../../../shared/crud';
import { Contest, emptyContest } from '../../../core/types/contest';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { ContestAbout, emptyContestAbout } from '../../../core/types/contestAbout';
import { Language } from '../../../core/types/language';
import { UploadAdapter, TheUploadAdapterPlugin } from '../../../core/misc/uploadAdapter';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import editorConfig from '../../../core/config/editorConfig';
import { Salone } from '../../../core/types/salone';
import { ContestMenu, emptyContestMenu } from '../../../core/types/contestMenu';


@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.less']
})
export class ContestComponent extends CrudComponent<Contest> {
  Contests: Array<Contest> = [];
  isAboutVisible = false;
  isMenusLoading = false;
  isContestMenuVisible = false;
  aboutForm: FormGroup = this.fb.group({
    id: [],
    name: [null, []],
    languageId: null,
    thesis: '',
    rules: '',
  });
  contestMenuForm = this.fb.group({
    id: [],
    contestId: [],
    position: [],
    parentId: []
  });
  salones: Array<Salone> = [];
  abouts: Array<ContestAbout> = [];
  contestMenus: Array<ContestMenu> = [];
  languages: Array<Language> = [];
  currentContest = emptyContest;
  isEditingAbout = 0;
  isEditingMenu = 0;
  editingAbout = emptyContestAbout;
  editingMenu = emptyContestMenu;
  isAboutsLoading = false;
  Editor = ClassicEditor;
  ckconfig = editorConfig


  constructor(protected fb: FormBuilder, protected api: ApiService) {
    super(fb, api);


  }

  getEmptyEntity() {
    return emptyContest;
  }

  getEntities() {
    this.api.get<Array<Salone>>("api/admin/salones").subscribe(salones => {
      this.salones = salones;
    });

    this.api.get<Array<Language>>("api/admin/languages").subscribe(languages => {
      this.languages = languages;
    });

    return this.api.get<Array<Contest>>("api/admin/contests");
  }

  putEntity(id: string, data: any) {
    return this.api.put<Contest>(`/api/admin/Contests/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<Contest>(`/api/admin/Contests`, data);
  }

  deleteEntity(id: string) {
    return this.api.delete<Contest>(`/api/admin/Contests/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [null, []],
      saloneId: [null, []],
      subname: [null, []],
      years: [null, []],
      dateStart: [null, []],
      dateStop: [null, []],
      dateJuriEnd: [null, []],
      dateRateShow: [null, []],
      showType: [null, []],
      showRateState: [null, []],
      democraty: [null, []],
      payType: [null, []],
      sectionCount: [null, []],
      maxrate: [null, []],
      maxsize: [null, []],
      maxWeight: [null, []]
    });
  }

  find(id: String) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: Contest, e2: Contest) {
    return e1.id === e2.id;
  }

  loadRelated(id: string) {
    this.currentContest = this.find(id);
    this.loadAbouts(id);
    this.loadContestMenu(id);
  }

  loadAbouts(id: string) {
    this.isAboutsLoading = true;
    this.api.get<Array<ContestAbout>>(`api/admin/contestsAbout/all/${id}`).subscribe(abouts => {
      this.abouts = abouts;
      this.isAboutsLoading = false;
    });
  }

  loadContestMenu(id: string = '') {
    this.isMenusLoading = true;
    this.api.get<Array<ContestAbout>>(`api/admin/contestMenus/all/${id}`).subscribe(contestMenus => {
      this.contestMenus = contestMenus;
      this.isMenusLoading = false;
    });
  }

  appendAbout() {
    this.editingAbout = emptyContestAbout;
    this.isAboutVisible = true;
    this.isEditingAbout = 1;
    this.aboutForm.patchValue(emptyContestAbout);
  }

  editAbout(id: string) {
    this.editingEntity = this.find(id);
    this.isEditingAbout = 2;
    this.isAboutVisible = true;
    this.api.get<ContestAbout>(`/api/admin/ContestsAbout/${id}`).subscribe(about => {
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
      ContestId: this.currentContest && this.currentContest.id
    }
    this.isAboutVisible = false;

    if (this.isEditingAbout === 1) {
      this.api.post<ContestAbout>(`/api/admin/ContestsAbout/${this.currentContest.id}`, payload).subscribe(about => {
        this.abouts = this.abouts.concat([about]);
      });
    } else if (this.isEditingAbout === 2) {
      this.api.put<ContestAbout>(`/api/admin/ContestsAbout/${this.editingAbout.id}`, payload).subscribe(about => {
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

  editContestMenu(id: string) {
    this.editingEntity = this.find(id);
    this.isEditingMenu = 2;
    this.isContestMenuVisible = true;
    this.api.get<ContestMenu>(`/api/admin/contestMenus/${id}`).subscribe(menu => {
      this.editingMenu = menu;
      this.contestMenuForm.patchValue(this.editingMenu);
    });
  }

  handleOkMenu() {
    const payload = {
      ...this.contestMenuForm.value,
      ContestId: this.currentContest && this.currentContest.id
    }
    this.isContestMenuVisible = false;

    if (this.isEditingMenu === 1) {
      this.api.post<ContestAbout>(`/api/admin/contestMenus/${this.currentContest.id}`, payload).subscribe(menu => {
        this.contestMenus = this.contestMenus.concat([menu]);
      });
    } else if (this.isEditingMenu === 2) {
      this.api.put<ContestAbout>(`/api/admin/contestMenus/${this.editingMenu.id}`, payload).subscribe(menu => {
        this.contestMenus = this.contestMenus.map(m => {

          if (m.id === menu.id) {
            return menu;
          }

          return m;
        });
      });
    }
  }

  handleCancelMenu() {
    this.isContestMenuVisible = false;
  }

  appendMenu() {
    this.editingMenu = emptyContestMenu;
    this.isContestMenuVisible = true;
    this.isEditingMenu = 1;
    const id = this.currentContest && this.currentContest.id
    this.loadContestMenu(id ? id + '' : '');
    this.contestMenuForm.patchValue(emptyContestMenu);
  }

  // getRegularType(id: number) {
  //   return this.regularTypes[id].name;
  // }

  // getPrivateType(id: number) {
  //   return this.privateTypes[id].name;
  // }

}
