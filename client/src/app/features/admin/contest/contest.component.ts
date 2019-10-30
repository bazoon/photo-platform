import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contest, emptyContest } from '../../../core/types/contest';
import { ContestMenu, emptyContestMenu } from '../../../core/types/contestMenu';
import { Lexicon } from '../../../core/types/lexicon';
import { PubMenu } from '../../../core/types/pubMenu';
import { Salone } from '../../../core/types/salone';
import { CrudComponent } from '../../../shared/crud';
import {ApiService} from 'src/app/core/services/api.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.less']
})
export class ContestComponent extends CrudComponent<Contest> {
  Contests: Array<Contest> = [];
  isLexiconVisible = false;
  isMenusLoading = false;
  isContestMenuVisible = false;

  contestMenuForm = this.fb.group({
    id: [],
    contestId: [],
    position: [],
    parentId: []
  });
  lexiconForm = this.fb.group({
    lexiconId: []
  });
  salones: Array<Salone> = [];

  lexicons: Array<Lexicon> = [];
  contestMenus: Array<ContestMenu> = [];

  currentContest = emptyContest;
  isEditingMenu = 0;

  editingMenu = emptyContestMenu;
  menuTree: Array<any> = [];
  currentMenuNode?: any;
  isAppendingRootMenu = false;
  isPublicationsVisible = false;
  currentMenuNodeId = -10;

  constructor(protected fb: FormBuilder, protected api: ApiService) {
    super(fb, api);
  }

  getEmptyEntity() {
    return emptyContest;
  }

  getEntities() {
    this.api.get<Array<Salone>>('api/admin/salones').subscribe(salones => {
      this.salones = salones;
    });


    return this.api.get<Array<Contest>>('api/admin/contests');
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

  find(id: string) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: Contest, e2: Contest) {
    return e1.id === e2.id;
  }

  loadRelated(id: string) {
    this.currentContest = this.find(id);
    this.loadContestMenu(id);
    this.loadLexicons();
  }



  loadContestMenu(id: string = '') {
    this.isMenusLoading = true;
    this.api
    .get<Array<ContestMenu>>(`api/admin/contestMenus/all/${id}`)
    .subscribe(contestMenus => {
      this.contestMenus = contestMenus;
      this.isMenusLoading = false;
      this.menuTree = contestMenus;
    });
  }

  loadLexicons() {
    this.api.get<Array<Lexicon>>(`api/admin/lexicons`).subscribe(lexicons => {
      this.lexicons = lexicons;
    });
  }


  appendMenu(lexiconId: number) {
    this.isAppendingRootMenu = true;
    this.api
    .post<ContestMenu>(`/api/admin/contestMenus/root`, {
      id: this.currentContest.id,
      lexiconId
    })
    .subscribe(menu => {
      this.editingMenu = menu;
      this.menuTree = this.menuTree.concat([
        { lexiconId: menu.lexiconId, key: menu.id }
      ]);
      this.isAppendingRootMenu = false;
    });
  }

  appendMenuNode(node: any, lexiconId: number) {
    this.api
    .post<ContestMenu>(`/api/admin/contestMenus/${node.key}`, {
      contestId: this.currentContest.id,
      lexiconId
    })
    .subscribe(menu => {
      node.addChildren([
        {
          lexiconId: menu.lexiconId,
          key: menu.id,
          position: menu.position
        }
      ]);
    });
  }
  // getRegularType(id: number) {
  //   return this.regularTypes[id].name;
  // }

  // getPrivateType(id: number) {
  //   return this.privateTypes[id].name;
  // }

  getLexicon(isAppendingRootMenu: boolean, node?: any) {
    this.isAppendingRootMenu = isAppendingRootMenu;
    this.isLexiconVisible = true;
    this.currentMenuNode = node;
  }

  handleCancelLexicon() {
    this.isLexiconVisible = false;
  }

  handleOkLexicon() {
    this.isLexiconVisible = false;
    if (this.isAppendingRootMenu) {
      this.appendMenu(this.lexiconForm.value.lexiconId);
    } else {
      this.appendMenuNode(
        this.currentMenuNode,
        this.lexiconForm.value.lexiconId
      );
    }
  }

  pubMenuLexiconChanged(node: any) {
    return this.api
    .put<PubMenu>(`/api/admin/contestMenus/${node.key}`, {
      contestMenuId: node.key,
      lexiconId: node.origin.lexiconId
    })
    .subscribe(pubMenus => {
      console.log(pubMenus);
    });
  }

  openPublications(id: number) {
    this.currentMenuNodeId = id;
    this.isPublicationsVisible = true;
  }

  handleOkPub() {
    this.isPublicationsVisible = false;
  }

  handleCancelPub() {
    this.isPublicationsVisible = false;
  }


  removeMenuNode(id: string) {
    this.api.delete(`/api/admin/contestMenus/${id}`).subscribe(() => {
      this.loadContestMenu(this.currentContest.id + '');
    });
  }
}
