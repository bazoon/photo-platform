import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminComponent } from './layout/admin.component';
import { AdminsComponent } from './admins/admins.component';
import { OrganizersComponent } from './organizers/organizers.component';
import { LanguagesComponent } from './languages/languages.component';
import { SaloneTypeComponent } from './salone-type/salone-type.component';
import { SaloneComponent } from './salone/salone.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ContestComponent } from './contest/contest.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TranslationLoader, HttpLoaderFactory } from '../../core/misc/translationLoader';
import { ContestMenuComponent } from './contest-menu/contest-menu.component';
import { LexiconComponent } from './lexicon/lexicon.component';
import { PublicationsComponent } from './publications/publications.component';
import { ContestApplicationsComponent } from './contest-applications/contest-applications.component';
import { ContestPhotoworksComponent } from './contest-photoworks/contest-photoworks.component';
import { ContestJuriesComponent } from './contest-juries/contest-juries.component';
import { ContestResultsComponent } from './contest-results/contest-results.component';
import { ContestAboutComponent } from './contest-about/contest-about.component';
import { ContestSectionsComponent } from './contest-sections/contest-sections.component';
import { AwardTypesComponent } from './award-types/award-types.component';
import { ContestAwardStackComponent } from './contest-award-stack/contest-award-stack.component';



@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    AdminsComponent,
    OrganizersComponent,
    LanguagesComponent,
    SaloneTypeComponent,
    SaloneComponent,
    ContestComponent,
    ContestMenuComponent,
    LexiconComponent,
    PublicationsComponent,
    ContestApplicationsComponent,
    ContestPhotoworksComponent,
    ContestJuriesComponent,
    ContestResultsComponent,
    ContestAboutComponent,
    ContestSectionsComponent,
    AwardTypesComponent,
    ContestAwardStackComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    CKEditorModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  exports: [
    AdminComponent,
    UsersComponent
  ]
})
export class AdminModule { }
