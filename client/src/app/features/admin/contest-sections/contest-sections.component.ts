import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {
  ContestSection,
  emptyContestSection
} from '../../../core/types/contestSection';
import {ApiService} from 'src/app/core/services/api.service';

@Component({
  selector: 'app-contest-sections',
  templateUrl: './contest-sections.component.html',
  styleUrls: ['./contest-sections.component.less']
})
export class ContestSectionsComponent implements OnChanges {
  @Input() contestId = -1;
  contestSections: Array<ContestSection> = [];
  isSectionVisible = false;

  sectionForm = this.fb.group({
    maxCountImg: [],
    name: []
  });

  editingSection?: ContestSection;

  constructor(private fb: FormBuilder, private api: ApiService) { }


  ngOnChanges() {
    if (this.contestId > 0) {
      this.loadSections();
    }
  }

  loadSections() {
    this.api.get<Array<ContestSection>>(`api/admin/contestSections/all/${this.contestId}`).subscribe(contestSections => {
      this.contestSections = contestSections;
    });
  }


  appendSection() {
    this.isSectionVisible = true;
    this.editingSection = undefined;
  }

  editSection(id: number) {
    this.editingSection =
      this.contestSections.find(s => s.id === id) || emptyContestSection;
    this.sectionForm.patchValue(this.editingSection);
    this.isSectionVisible = true;
  }

  removeSection(id: number) {
    this.api.delete(`/api/admin/contestSections/${id}`).subscribe(() => {
      this.contestSections = this.contestSections.filter(a => a.id !== id);
    });
  }

  handleOkSection() {
    this.isSectionVisible = false;
    if (this.editingSection) {
      this.api
      .put<ContestSection>(
        `/api/admin/contestSections/${this.editingSection.id}`,
        this.sectionForm.value
      )
      .subscribe(section => {
        this.contestSections = this.contestSections.map(s => {
          if (section.id === s.id) {
            return section;
          }
          return s;
        });
      });
    } else {
      this.api
      .post<ContestSection>(
        `/api/admin/contestSections/${this.contestId}`,
        this.sectionForm.value
      )
      .subscribe(section => {
        this.contestSections = this.contestSections.concat([section]);
      });
    }
  }

  handleCancelSection() {
    this.isSectionVisible = false;
  }

}
