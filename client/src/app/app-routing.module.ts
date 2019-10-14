import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { MainComponent } from './features/main/main.component';
import { RegisterComponent } from './features/register/register.component';
import { PublicationComponent } from './features/publication/publication.component';
import { PublicationsComponent } from './features/publications/publications.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', loadChildren: "./features/admin/admin.module#AdminModule" },
  { path: 'user', loadChildren: "./features/user/user.module#UserModule" },
  {
    path: 'publications/:id', component: PublicationComponent
  },
  {
    path: 'sections/:id', component: PublicationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
