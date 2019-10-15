import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, ru_RU } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegStatePipe } from '../pipes/reg-state.pipe';
import { ModerStatePipe } from '../pipes/moder-state.pipe';


@NgModule({
  declarations: [
    RegStatePipe,
    ModerStatePipe
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
    RegStatePipe,
    ModerStatePipe
  ]

})
export class SharedModule { }