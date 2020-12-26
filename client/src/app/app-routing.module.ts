import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { MainComponent } from './features/main/main.component';
import { RegisterComponent } from './features/register/register.component';
import { PublicationComponent } from './features/publication/publication.component';
import { PublicationsComponent } from './features/publications/publications.component';
import { ContestPhotosComponent } from './features/contest-photos/contest-photos.component';
import { SectionPhotosComponent } from './features/section-photos/section-photos.component';
import { VkComponent } from './features/login/vk/vk.component';
import { FbComponent } from './features/login/fb/fb.component';
import { GoogleComponent } from 'src/app/features/login/google/google.component';
import { AboutComponent } from 'src/app/features/about/about.component';
import { ThesisComponent } from 'src/app/features/thesis/thesis.component';
import { RulesComponent } from 'src/app/features/rules/rules.component';
import { ContactsComponent } from 'src/app/features/contacts/contacts.component';
import { RestoreFormComponent } from 'src/app/features/restore-form/restore-form.component';
import { ChangePasswordComponent } from 'src/app/features/change-password/change-password.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'thesis', component: ThesisComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'oauth/vk', component: VkComponent },
  { path: 'oauth/fb', component: FbComponent },
  { path: 'oauth/google', component: GoogleComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', loadChildren: './features/admin/admin.module#AdminModule' },
  { path: 'restore', component: RestoreFormComponent },
  { path: 'user', loadChildren: './features/user/user.module#UserModule' },
  {
    path: 'change-passwords/:id/:hash',
    component: PublicationsComponent
  },
  {
    path: 'publications/:parentId/:id',
    component: PublicationComponent
  },
  {
    path: 'sections/:id',
    component: PublicationsComponent
  },
  {
    path: 'photos/sections',
    component: ContestPhotosComponent
  },
  {
    path: 'photos/:sectionId',
    component: SectionPhotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {}
