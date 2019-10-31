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
import { LexiconComponent } from './lexicon/lexicon.component';
import { PublicationsComponent } from './publications/publications.component';
import { ContestPhotoworksComponent } from './contest-photoworks/contest-photoworks.component';
import { ContestJuriesComponent } from './contest-juries/contest-juries.component';
import { ContestResultsComponent } from './contest-results/contest-results.component';
import {AwardTypesComponent} from 'src/app/features/admin/award-types/award-types.component';

const routes: Routes = [
  {
    path: '',
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
        path: 'contests/:id/works', component: ContestPhotoworksComponent
      },
      {
        path: 'contests/:id/juries', component: ContestJuriesComponent
      },
      {
        path: 'contests/:id/results', component: ContestResultsComponent
      },
      {
        path: 'contests/:menuId/pubs', component: PublicationsComponent
      },
      {
        path: 'contests', component: ContestComponent
      },
      {
        path: 'lexicons', component: LexiconComponent
      },
      {
        path: 'award-types', component: AwardTypesComponent
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
