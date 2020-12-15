import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './layout/layout.component';
import { UserSalonesComponent } from './salones/salones.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ContestApplicationsComponent } from './contest-applications/contest-applications.component';
import { ContestApplicationComponent } from './contest-application/contest-application.component';
import { JuryComponent } from './jury/jury.component';
import { ShortListComponent } from './short-list/short-list.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/core/misc/translationLoader';

@NgModule({
  declarations: [
    UserLayoutComponent,
    UserSalonesComponent,
    ContestApplicationsComponent,
    ContestApplicationComponent,
    JuryComponent,
    ShortListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class UserModule {}
