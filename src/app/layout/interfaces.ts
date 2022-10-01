import { IsActiveMatchOptions } from '@angular/router';

export interface MenuItem {
  icon?: string;
  label: string;
  routeLink?: string;
  routerLinkActiveOptions?: IsActiveMatchOptions,
}

export interface FilterI {
  pageIndex: 0,
  pageSize: 5,
  length: 0
}
