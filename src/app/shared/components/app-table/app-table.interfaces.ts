export interface TableColumnI {
  key: string;
  label: string;
  hide?: boolean;
  render?: (row: any) => string;
  sortable?: boolean;
}

export interface TableActionI {
  key: string;
  tooltip: string;
  hide?: (row: any) => boolean;
  taIcon?: string;
}

export interface RowActionI {
  key: string;
  row: any;
}
