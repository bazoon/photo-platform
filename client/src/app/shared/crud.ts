import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../core/services/api.service';
import { Observable, of } from 'rxjs';


export class CrudComponent<T> {
  idField: string = "id";
  entities: Array<T> = [];
  editingEntity?: T;
  isEditVisible: boolean = false;
  editState: number = 0; // 0 no edit, 1 - create, 2 - edit
  form: FormGroup;

  getEmptyEntity(): T {
    return {} as T;
  }

  getEntities(): Observable<Array<T>> {
    return of([]);
  }

  putEntity(id: string, data: any): Observable<any> {
    return of(null);
  }

  postEntity(data: any): Observable<any> {
    return of(null);
  }

  deleteEntity(id: string): Observable<any> {
    return of({});
  }

  getForm(): FormGroup {
    return this.fb.group({});
  }

  find(id: string): T {
    return {} as T;
  }

  isEqual(entity1: T, entity: T) {
    return false;
  }

  constructor(protected fb: FormBuilder, protected api: ApiService) {
    this.getEntities().subscribe((entities: Array<T>) => {
      this.entities = entities;
    });

    this.form = this.getForm();
  }

  append() {
    this.editingEntity = this.getEmptyEntity();
    this.isEditVisible = true;
    this.form.patchValue(this.editingEntity);
    this.editState = 1;
  }

  edit(id: string) {
    this.editingEntity = this.find(id);
    this.isEditVisible = true;
    console.log(this.editingEntity);
    this.form.patchValue(this.editingEntity);
    this.editState = 2;
  }

  remove(id: string) {
    const entity = this.find(id);
    this.deleteEntity(id).subscribe(() => {
      this.entities = this.entities.filter(e => e !== entity);
    });
  }

  handleOk() {
    this.isEditVisible = false;
    const id = this.form.value[this.idField] || this.form.value.id;

    if (this.editState === 2) {
      this.putEntity(id, this.form.value).subscribe(entity => {
        this.editState = 0;
        this.entities = this.entities.map(e => {
          if (this.isEqual(entity, e)) {
            return entity;
          } else {
            return e;
          }
        });
      });
    } else {
      this.postEntity(this.form.value).subscribe(entity => {
        this.editState = 0;
        this.entities = this.entities.concat([entity])
      });
    }
  }

  handleCancel() {
    this.isEditVisible = false;
  }

}