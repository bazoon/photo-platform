import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, ru_RU } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@NgModule({
  declarations: [

  ],
  imports: [
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [{ provide: NZ_I18N, useValue: ru_RU }],
  exports: [
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
  ]

})
export class SharedModule { }