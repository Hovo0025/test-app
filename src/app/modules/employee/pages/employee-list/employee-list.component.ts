import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { EmployeesApiService } from '../../services/employees-api.service';
import { EmployeeItemI } from '@core/intefaces/employees.inteface';
import { FilterI } from '../../../../layout/interfaces';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  readonly employees$: Observable<EmployeeItemI[]>;
  readonly filterValue$ = new BehaviorSubject<any>({
    page: 1,
    size: 10,
    length: 0
  });
  readonly totalItems$ = new BehaviorSubject<number>(0);
  protected destroy$ = new Subject<void>();

  constructor(private readonly employeesApiService: EmployeesApiService) {
    this.employees$ = this.filterValue$
      .pipe(
        switchMap((filters: FilterI) => this.employeesApiService.getEmployees(filters).pipe(
          tap(resp => this.totalItems$.next(resp.headers.get('x-total-count') ?? 0)),
          map(resp => resp.body || []),
          catchError(() => of([])),
        ))
      )
  }

  ngOnInit(): void {
  }

  onPageChange(event: PageEvent): void {
    this.filterValue$.next({
      ...this.filterValue$.value,
      page: event.pageIndex,
      size: event.pageSize
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
