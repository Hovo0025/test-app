import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@core/material/material.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeesTableComponent } from './components/employees-table/employees.table.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeesTableComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    SharedModule
  ],
  providers: []
})
export class EmployeeModule { }
