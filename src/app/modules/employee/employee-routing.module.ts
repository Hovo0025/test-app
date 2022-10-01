import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { EditEmployeeComponent } from './pages/edit-employee/edit-employee.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent,
  children: [
    { path: 'list', component: EmployeeListComponent },
    { path: 'create', component: CreateEmployeeComponent },
    { path: 'edit/:id', component: EditEmployeeComponent },
    { path: '**', redirectTo: 'list' }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
