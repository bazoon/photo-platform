import { Component, OnInit } from '@angular/core';
import { AwardType, emptyAwardType } from '../../../core/types/awardType';
import { CrudComponent } from '../../../shared/crud';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-award-types',
  templateUrl: './award-types.component.html',
  styleUrls: ['./award-types.component.less']
})
export class AwardTypesComponent extends CrudComponent<AwardType> {
  fileList: Array<any> = [];
  isImageVisible = false;
  currentImage = '';

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = [file];
    return false;
  };

  getEmptyEntity() {
    return emptyAwardType;
  }

  getEntities() {
    return this.api.get<Array<AwardType>>('api/admin/awardTypes');
  }

  putEntity(id: string, data: any) {
    return this.api.put<AwardType>(`/api/admin/awardTypes/${id}`, data);
  }

  postEntity(data: any) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('img', this.fileList[0]);
    return this.api.post<AwardType>(`/api/admin/awardTypes`, formData);
  }

  deleteEntity(id: string) {
    return this.api.delete<AwardType>(`/api/admin/awardTypes/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      name: [null, []],
      img: [null, []]
    });
  }

  find(id: string) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: AwardType, e2: AwardType) {
    return e1.id === e2.id;
  }

  showImage(image: string) {
    this.currentImage = image;
    this.isImageVisible = true;
  }
}
