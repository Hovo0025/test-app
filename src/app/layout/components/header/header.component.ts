import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() readonly triggerSidenav: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  toggleSideNav(): void {
    this.triggerSidenav.emit();
  }
}
