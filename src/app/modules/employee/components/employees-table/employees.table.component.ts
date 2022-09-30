import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';

import { EmployeeItemInterface } from '@core/intefaces/employees.inteface';
import { TableActionI, TableColumnI } from '@shared/components/app-table/app-table.interfaces';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees.table.component.html',
  styleUrls: ['./employees.table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent implements OnInit {
  readonly constructorName = 'EmployeesTableComponent';

  @Input() dataSource: EmployeeItemInterface[] = [];
  @Input() pageIndex = 0;
  @Input() totalItems = 0;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() downloadReport = new EventEmitter<void>();

  readonly columns$ = new BehaviorSubject<TableColumnI[]>([]);
  readonly actions$ = new BehaviorSubject<TableActionI[]>([]);

  constructor() {
  }

  ngOnInit(): void {
    this.initTable()
  }

  private initTable() {
    this.columns$.next([
      {
        key: 'name',
        label: 'Name',
        sortable: true,
      },
      {
        key: 'age',
        label: 'Age',
        sortable: true,
      },
      {
        key: 'gender',
        label: 'Gender',
        sortable: true,
      },
      {
        key: 'company',
        label: 'Company name',
        sortable: true,
      },
      {
        key: 'email',
        label: 'User email',
        sortable: true,
      },
      {
        key: 'phone',
        label: 'Phone',
        sortable: true,
      },
      {
        key: 'address',
        label: 'Address',
        sortable: true,
      }
    ]);

    this.actions$.next([
      {
        key: 'edit',
        taIcon: 'edit',
        tooltip: 'Edit employee',
      },
      {
        key: 'view',
        taIcon: 'delete',
        tooltip: 'Delete employee',
      },
    ])
  }

  public onRowAction(action: any): void {
    switch (action.key) {
      case 'edit':
        // TODO emit edit
        break
      case 'delete':
        // TODO emit delete
        break;
    }
  }
}
