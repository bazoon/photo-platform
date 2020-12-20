import { Component, OnInit } from '@angular/core';
import { ContestSection } from '../../../core/types/contestSection';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UploadFile } from 'ng-zorro-antd/upload';
import { Photowork } from '../../../core/types/photowork';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contest-application',
  templateUrl: './contest-application.component.html',
  styleUrls: ['./contest-application.component.less']
})
export class ContestApplicationComponent implements OnInit {
  sections: Array<ContestSection> = [];
  fileList: Array<UploadFile> = [];
  currentSection?: ContestSection;
  section?: ContestSection;
  fileNames: { [index: string]: string } = {};
  files: Array<Photowork> = [];
  errorMessage?: String
  canUpload = false

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.api
        .get<Array<ContestSection>>(
          `api/contestSections/all/${p.get('id')}/${this.translate.currentLang}`
        )
        .subscribe(sections => {
          this.sections = sections;
        });
    });

    this.translate.onLangChange.subscribe((t: any) => {
      this.route.paramMap.subscribe(p => {
        this.api
          .get<Array<ContestSection>>(
            `api/contestSections/all/${p.get('id')}/${
              this.translate.currentLang
            }`
          )
          .subscribe(sections => {
            this.sections = sections;
          });
      });
    });
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  getCurrentSection() {
    return this.sections.find(s => s.id === this.currentSection);
  }

  upload() {
    const formData = new FormData();

    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
  
    const section = this.getCurrentSection();
    const maxWeight = section.maxWeight;
    const hasOversize = this.fileList.some(f => f.size > maxWeight * 1024);

    if (hasOversize) {
      this.errorMessage = `Размер файлов не может превышать ${maxWeight} килобайт`;
      return;
    } else {
      this.errorMessage = '';
    }

    formData.append('names', JSON.stringify(this.fileNames));
 

    this.api
      .post<any>(`api/contestSections/${this.currentSection}/uploads`, formData)
      .subscribe(() => {
        this.fileList = [];
        this.loadImages();
      });
  }

  removeFile(name: string) {
    this.fileList = this.fileList.filter(file => file.name !== name);
  }

  handleChangeSection() {
    this.section = this.getCurrentSection();
    this.loadImages();
  }

  updateUploadPossibility() {
    const section = this.getCurrentSection();
    const {maxCountImg} = section;
    this.canUpload = this.files.length < maxCountImg;
  }

  loadImages() {
    this.api
      .get<any>(`api/contestSections/${this.currentSection}/files`)
      .subscribe(files => {
        this.files = files;
        this.updateUploadPossibility()
      });
  }

  removeImage(id: number) {
    this.api.delete<any>(`api/contestSections/files/${id}`).subscribe(() => {
      this.files = this.files.filter(f => f.id !== id);
      this.updateUploadPossibility();
    });
  }
}
