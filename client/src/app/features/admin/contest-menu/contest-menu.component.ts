import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { ContestMenu, emptyContestMenu } from '../../../core/types/contestMenu';
import { Lexicon } from '../../../core/types/lexicon';
import { PubMenu } from '../../../core/types/pubMenu';
import {LanguagesService} from 'src/app/core/services/languages.service';

@Component({
  selector: 'app-contest-menu',
  templateUrl: './contest-menu.component.html',
  styleUrls: ['./contest-menu.component.less']
})
export class ContestMenuComponent implements OnChanges {
  @Input() contestId = -1;
  isMenusLoading = false;
  isContestMenuVisible = false;
  contestMenus: Array<ContestMenu> = [];
  editingMenu = emptyContestMenu;
  menuTree: Array<any> = [];
  currentMenuNode?: any;
  isAppendingRootMenu = false;
  isPublicationsVisible = false;
  currentMenuNodeId = -10;
  isEditingMenu = 0;
  isLexiconVisible = false;
  lexicons: Array<Lexicon> = [];
  lexiconForm = this.fb.group({
    lexiconId: []
  });

  constructor(private fb: FormBuilder, private api: ApiService, protected langService: LanguagesService) {

  }

  contestMenuForm = this.fb.group({
    id: [],
    contestId: [],
    position: [],
    parentId: []
  });

  ngOnChanges() {
    if (this.contestId > 0) {
      this.loadContestMenu();
      this.loadLexicons();
    }
  }


  loadContestMenu() {
    this.isMenusLoading = true;
    this.api
    .get<Array<ContestMenu>>(`api/admin/contestMenus/all/${this.contestId}`)
    .subscribe(contestMenus => {
      this.contestMenus = contestMenus;
      this.isMenusLoading = false;
      this.menuTree = contestMenus;
    });
  }

  appendMenu(lexiconId: number) {
    this.isAppendingRootMenu = true;
    this.api
    .post<ContestMenu>(`/api/admin/contestMenus/root`, {
      id: this.contestId,
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
      contestId: this.contestId,
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

  loadLexicons() {
    this.api.get<Array<Lexicon>>(`api/admin/lexicons`).subscribe(lexicons => {
      this.lexicons = lexicons;
    });
  }

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
      this.loadContestMenu();
    });
  }



}
