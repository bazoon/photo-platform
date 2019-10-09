import { Component } from '@angular/core';
import { SaloneType, emptySaloneType } from '../../../core/types/saloneType';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CrudComponent } from '../../../shared/crud';

@Component({
  selector: 'app-salon-type',
  templateUrl: './salone-type.component.html',
  styleUrls: ['./salone-type.component.less']
})
export class SaloneTypeComponent extends CrudComponent<SaloneType> {

  getEmptyEntity() {
    return emptySaloneType;
  }

  getEntities() {
    return this.api.get<Array<SaloneType>>("api/admin/saloneTypes");
  }

  putEntity(id: string, data: any) {
    return this.api.put<SaloneType>(`/api/admin/saloneTypes/${id}`, data);
  }

  postEntity(data: any) {
    return this.api.post<SaloneType>(`/api/admin/saloneTypes`, data);
  }

  deleteEntity(id: string) {
    return this.api.delete<SaloneType>(`/api/admin/saloneTypes/${id}`);
  }

  getForm() {
    return this.fb.group({
      id: [],
      name: [null, []],
    });
  }

  find(id: String) {
    return this.entities.find(e => e.id === +id) || this.getEmptyEntity();
  }

  isEqual(e1: SaloneType, e2: SaloneType) {
    return e1.id === e2.id;
  }

}



