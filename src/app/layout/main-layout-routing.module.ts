import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'employee',
        loadChildren: () => import('../modules/employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../modules/profile/profile.module').then(m => m.ProfileModule)
      },
      { path: '**', redirectTo: 'employee' }
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule {
}
