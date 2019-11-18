import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, ru_RU } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegStatePipe } from '../pipes/reg-state.pipe';
import { ModerStatePipe } from '../pipes/moder-state.pipe';
import { PreviewImageComponent } from '../features/preview-image/preview-image.component';
import { CommonModule } from '@angular/common';
import { RbacShowDirective } from '../core/directives/rbac-show.directive';
import { VkComponentIcon } from '../core/icons/vk/vk.component';
import { FbComponentIcon } from '../core/icons/fb/fb.component';
import { GoogleComponentIcon } from '../core/icons/google/google.component';

@NgModule({
  declarations: [
    RegStatePipe,
    ModerStatePipe,
    PreviewImageComponent,
    RbacShowDirective,
    VkComponentIcon,
    FbComponentIcon,
    GoogleComponentIcon
  ],
  imports: [CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: NZ_I18N, useValue: ru_RU }],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    RegStatePipe,
    ModerStatePipe,
    PreviewImageComponent,
    RbacShowDirective,
    VkComponentIcon,
    FbComponentIcon,
    GoogleComponentIcon
  ]
})
export class SharedModule {}
