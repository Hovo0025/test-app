import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RowActionI, TableActionI, TableColumnI } from './app-table.interfaces';
import { EmployeeItemI } from '@core/intefaces/employees.inteface';

export const PAGE_SIZE_OPTIONS: number[] = [5, 10, 20, 50]; // TODO move

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTableComponent implements OnInit {
  @Input() dataSource: EmployeeItemI[] = [];
  @Input() columns: TableColumnI[] = [];
  @Input() actions: TableActionI[] = [];
  @Input() pageIndex = 0;
  @Input() pageSize = 10;
  @Input() totalItems = 0;

  @Input() showIndex: boolean = false;
  @Input() showPagination: boolean = false;
  @Input() showTableColumn: boolean = false;
  @Input() showColumnSelect: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() noRowsKey: string = 'common.no-rows';
  @Input() routeConstructorName: string = '';

  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() rowAction: EventEmitter<RowActionI> = new EventEmitter<RowActionI>();

  public allColumns: string[] = [];
  public displayedColumns: string[] = [];
  public columnsForStart: string[] = [];
  public columnsForEnd: string[] = [];
  public PAGE_SIZE_OPTIONS: number[] = PAGE_SIZE_OPTIONS;

  ngOnInit(): void {
    this.allColumns = this.columns.filter(col => !col.hide).map(col => col.key);
    this.columnsForStart = this.showIndex ? ['index'] : [];
    this.columnsForEnd = this.actions.length ? ['actions'] : [];
  }

  getDisplayedColumns(event: string[]){
    this.displayedColumns = event;
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.totalItems = event.length;
    this.pageChange.emit(event);
  }
}
