import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, ru_RU } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegStatePipe } from '../pipes/reg-state.pipe';
import { ModerStatePipe } from '../pipes/moder-state.pipe';
import { PreviewImageComponent } from '../features/preview-image/preview-image.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    RegStatePipe,
    ModerStatePipe,
    PreviewImageComponent
  ],
  imports: [
    CommonModule,
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
    ModerStatePipe,
    PreviewImageComponent
  ]

})
export class SharedModule { }