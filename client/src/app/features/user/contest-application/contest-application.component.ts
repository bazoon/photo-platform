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
  fileNames: { [index: string]: string } = {};
  files: Array<Photowork> = [];

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

  upload() {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });

    const keys = Object.keys(this.fileNames);
    formData.append('names', JSON.stringify(this.fileNames));
    console.log(9991);
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
    this.loadImages();
  }

  loadImages() {
    this.api
      .get<any>(`api/contestSections/${this.currentSection}/files`)
      .subscribe(files => {
        this.files = files;
      });
  }

  removeImage(id: number) {
    this.api.delete<any>(`api/contestSections/files/${id}`).subscribe(() => {
      this.files = this.files.filter(f => f.id !== id);
    });
  }
}
