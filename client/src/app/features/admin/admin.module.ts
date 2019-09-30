import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminComponent } from './layout/admin.component';
import { AdminsComponent } from './admins/admins.component';
import { OrganizersComponent } from './organizers/organizers.component';
import { LanguagesComponent } from './languages/languages.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    AdminsComponent,
    OrganizersComponent,
    LanguagesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  exports: [
    AdminComponent,
    UsersComponent
  ]
})
export class AdminModule { }
