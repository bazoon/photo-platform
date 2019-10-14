import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSalonesComponent } from './salones/salones.component';
import { ContestApplicationsComponent } from './contest-applications/contest-applications.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'salones', component: UserSalonesComponent
      },
      {
        path: 'applications', component: ContestApplicationsComponent
      },
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
