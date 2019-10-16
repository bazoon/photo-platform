import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutComponent } from './layout/layout.component';
import { UserSalonesComponent } from './salones/salones.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ContestApplicationsComponent } from './contest-applications/contest-applications.component';
import { ContestApplicationComponent } from './contest-application/contest-application.component';
import { JuryComponent } from './jury/jury.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    UserSalonesComponent,
    ContestApplicationsComponent,
    ContestApplicationComponent,
    JuryComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
