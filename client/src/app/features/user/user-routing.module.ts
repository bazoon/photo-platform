import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSalonesComponent } from './salones/salones.component';
import { ContestApplicationsComponent } from './contest-applications/contest-applications.component';
import { ContestApplicationComponent } from './contest-application/contest-application.component';
import { JuryComponent } from './jury/jury.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'salones', component: UserSalonesComponent
      },
      {
        path: 'applications/:id', component: ContestApplicationComponent
      },
      {
        path: 'applications', component: ContestApplicationsComponent
      },
      {
        path: 'jury', component: JuryComponent
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
export class UserRoutingModule { }
