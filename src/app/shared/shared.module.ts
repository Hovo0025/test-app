import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@core/material/material.module';
import { TableColumnsSelectComponent } from './components/table-columns-select/table-columns-select.component';
import { AppTableComponent } from './components/app-table/app-table.component';

@NgModule({
  declarations: [
    AppTableComponent,
    TableColumnsSelectComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    AppTableComponent,
    TableColumnsSelectComponent
  ],
  providers: []
})
export class SharedModule { }
