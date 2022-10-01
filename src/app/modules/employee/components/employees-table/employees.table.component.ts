import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { EmployeeItemI } from '@core/intefaces/employees.inteface';
import { TableActionI, TableColumnI } from '@shared/components/app-table/app-table.interfaces';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees.table.component.html',
  styleUrls: ['./employees.table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent implements OnInit {
  readonly constructorName = 'EmployeesTableComponent';

  @Input() employees$: Observable<EmployeeItemI[]> = of([]);
  @Input() pageIndex: any;
  @Input() totalItems = 0;

  @Output() pageChange = new EventEmitter<PageEvent>();

  readonly columns$ = new BehaviorSubject<TableColumnI[]>([]);
  readonly actions$ = new BehaviorSubject<TableActionI[]>([]);

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    this.initTable()
  }

  private initTable() {
    this.columns$.next([
      {
        key: 'firstName',
        label: 'First Name',
        sortable: true,
      },
      {
        key: 'lastName',
        label: 'Last Name',
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
        key: 'registered',
        label: 'Registered date',
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

  public onRowAction(action: any): void { // TODO add action type
    switch (action.key) {
      case 'edit':
        this.router.navigate([`/employee/edit/${action.row.id}`])
        break
      case 'delete':
        // TODO emit delete
        break;
    }
  }
}
