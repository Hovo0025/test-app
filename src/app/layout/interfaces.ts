import { IsActiveMatchOptions } from '@angular/router';

export interface MenuItem {
  icon?: string;
  label: string;
  routeLink?: string;
  routerLinkActiveOptions?: IsActiveMatchOptions,
}
