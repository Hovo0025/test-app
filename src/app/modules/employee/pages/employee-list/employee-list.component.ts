import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { EmployeesApiService } from '../../services/employees-api.service';
import { EmployeeItemInterface } from '@core/intefaces/employees.inteface';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  readonly employees$: Observable<EmployeeItemInterface[]> = of([]);
  readonly pagination$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: 10,
    length: 0
  });
  readonly totalItems$ = new BehaviorSubject<number>(0);

  constructor(private readonly employeesApiService: EmployeesApiService) {
    this.employees$ = this.employeesApiService.getEmployees(this.pagination$.getValue());
  }

  ngOnInit(): void {
  }
}
