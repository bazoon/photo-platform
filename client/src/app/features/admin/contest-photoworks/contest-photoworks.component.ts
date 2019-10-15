import { Component, OnInit } from '@angular/core';
import { Photowork } from '../../../core/types/photowork';
import { ApiService } from '../../../core/services/api.service';
import { ContestSection } from '../../../core/types/contestSection';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contest-photoworks',
  templateUrl: './contest-photoworks.component.html',
  styleUrls: ['./contest-photoworks.component.less']
})
export class ContestPhotoworksComponent implements OnInit {
  works: Array<Photowork> = [];
  listOfDisplayData: Array<Photowork> = [];
  sections: Array<ContestSection> = [];
  currentSection?: ContestSection;
  mapOfCheckedId: { [key: string]: boolean } = {};
  isAllDisplayDataChecked = false;


  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.api.get<Array<ContestSection>>(`api/contestSections/all/${p.get('id')}`).subscribe(sections => {
        this.sections = sections;
      });
    });
  }

  handleChangeSection() {
    this.loadImages();
  }

  loadImages() {
    this.api.get<any>(`api/contestSections/${this.currentSection}/files`).subscribe(files => {
      this.works = files;
    });
  }

  currentPageDataChange($event: Photowork[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    console.log(this.mapOfCheckedId);
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item => this.mapOfCheckedId[item.id]);
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  getSelectedIds() {
    const keys = Object.keys(this.mapOfCheckedId);
    return keys.reduce((acc: Array<string>, key) => {
      if (this.mapOfCheckedId[key]) {
        acc.push(key);
      }
      return acc;
    }, []);
  }

  approve() {
    const ids = this.getSelectedIds();
    this.api.post<any>(`api/admin/contestSections/${this.currentSection}/approves`, { ids }).subscribe(() => {
      this.listOfDisplayData = this.listOfDisplayData.map(item => {
        if (this.mapOfCheckedId[item.id]) {
          item.moder = 1;
        }
        return item;
      });
    });
  }

  decline() {
    const ids = this.getSelectedIds();
    this.api.post<any>(`api/admin/contestSections/${this.currentSection}/declines`, { ids }).subscribe(() => {
      this.listOfDisplayData = this.listOfDisplayData.map(item => {
        if (this.mapOfCheckedId[item.id]) {
          item.moder = 2;
        }
        return item;
      });
    });

  }


}
