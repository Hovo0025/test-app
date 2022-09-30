import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TableColumnI } from '../app-table/app-table.interfaces';

@Component({
  selector: 'app-table-columns-select',
  templateUrl: './table-columns-select.component.html',
  styleUrls: ['./table-columns-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableColumnsSelectComponent implements OnInit {

  private _allDisplayedColumns: TableColumnI[] = [];
  get allDisplayedColumns():TableColumnI[] {
    return this._allDisplayedColumns;
  }
  @Input() set allDisplayedColumns(cols: TableColumnI[])  {
    this._allDisplayedColumns = cols;
    if(this.constructorName){
      this.getColumns();
    }
  };

  @Input() constructorName: string = '';
  @Input() columnsForStart?: string[] = [];
  @Input() columnsForEnd?: string[] = [];
  allColumnsKey: string[] = [];
  @Output() displayedColumns = new EventEmitter<string[]>();

  selectedDisplayedColumns: string[] = [];

  constructor() { }
  ngOnInit(): void {
    this.getColumns();
  }

  getColumns(): void {
    this.allColumnsKey = this.allDisplayedColumns.filter(col => !col.hide).map(col => col.key);
    let checked = this.getTableColumnsFromStorage();
    this.selectedDisplayedColumns = checked?.filter(item => this.allColumnsKey.includes(item)) || this.allColumnsKey;
    this.displayedColumns.emit(this.getTableColumnsWithExcludedColumns(this.selectedDisplayedColumns));

  }
  tableColumnsChange(event: string[]) {
    this.selectedDisplayedColumns = this.addTableColumnsToStorage(event);
    this.displayedColumns.emit(this.getTableColumnsWithExcludedColumns(this.selectedDisplayedColumns));
  }

  addTableColumnsToStorage(columns: string[]): string[] {
    let getItem = localStorage.getItem('displayedColumns');
    let storageItem = getItem ? JSON.parse(getItem) : {};
    let addItem = {
      ...storageItem,
      [this.constructorName]: columns,
    }
    localStorage.setItem('displayedColumns', JSON.stringify(addItem));
    return columns;
  }

  getTableColumnsFromStorage(): string[] | null {
    let getItem = localStorage.getItem('displayedColumns');
    let storageItem = getItem ? JSON.parse(getItem) : {};
    if(this.constructorName in storageItem) {
      return storageItem[this.constructorName];
    }
    return null;
  }

  getTableColumnsWithExcludedColumns(all: string[]): string[] {
    let combined = all;
    if(this.columnsForStart){
      combined = [...this.columnsForStart, ...combined]
    }
    if(this.columnsForEnd){
      combined = [...combined, ...this.columnsForEnd]
    }
    return combined;
  }
}
