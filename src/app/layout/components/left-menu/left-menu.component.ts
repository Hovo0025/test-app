import { Component, Input } from '@angular/core';

import { MenuItem } from '../../interfaces';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent {
  @Input() routes: MenuItem[] = [];

  constructor() {
  }
}
