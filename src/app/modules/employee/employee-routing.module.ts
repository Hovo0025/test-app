import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent,
  children: [
    { path: 'list', component: EmployeeListComponent },
    { path: '**', redirectTo: 'list' }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
