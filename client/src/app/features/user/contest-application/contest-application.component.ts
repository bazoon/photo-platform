import { Component, OnInit } from '@angular/core';
import { ContestSection } from '../../../core/types/contestSection';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UploadFile } from 'ng-zorro-antd/upload';


@Component({
  selector: 'app-contest-application',
  templateUrl: './contest-application.component.html',
  styleUrls: ['./contest-application.component.less']
})
export class ContestApplicationComponent implements OnInit {
  sections: Array<ContestSection> = [];
  fileList: Array<UploadFile> = [];
  currentSection?: ContestSection;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      this.api.get<Array<ContestSection>>(`api/contestSections/all/${p.get('id')}`).subscribe(sections => {
        this.sections = sections;
      });
    });
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  upload(sectionId: number) {
    const formData = new FormData();
    this.fileList[sectionId].forEach((file: File) => {
      formData.append("file", file);
    });

    this.api.post<any>(`api/contestSections/${sectionId}/uploads`, formData).subscribe(files => {
      console.log(files);
    });
  }

}
