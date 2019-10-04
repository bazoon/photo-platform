import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin.component';
import { UsersComponent } from './users/users.component';
import { AdminsComponent } from '../../features/admin/admins/admins.component';
import { OrganizersComponent } from './organizers/organizers.component';
import { LanguagesComponent } from './languages/languages.component';
import { SaloneTypeComponent } from './salone-type/salone-type.component';
import { SaloneComponent } from './salone/salone.component';
import { ContestComponent } from './contest/contest.component';

const routes: Routes = [
  {
    path: '',
    // component: AdminComponent,
    children: [
      {
        path: 'users', component: UsersComponent
      },
      {
        path: 'admins', component: AdminsComponent
      },
      {
        path: 'organizers', component: OrganizersComponent
      },
      {
        path: 'languages', component: LanguagesComponent
      },
      {
        path: 'salon-types', component: SaloneTypeComponent
      },
      {
        path: 'salones', component: SaloneComponent
      },
      {
        path: 'contests', component: ContestComponent
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
