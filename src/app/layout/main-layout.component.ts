import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MenuItem} from './interfaces';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {
  loading = false;
  isSidenavOpened: boolean = false;
  isMobile = false;
  navbarRoute: MenuItem[] = [
    {
      icon: '',
      label: 'Employee',
      routeLink: 'employee',
      routerLinkActiveOptions: {
        queryParams: 'subset',
        matrixParams: 'subset',
        paths: 'subset',
        fragment: 'exact',
      },
    },
    {
      icon: '',
      label: 'Profile',
      routeLink: 'profile',
      routerLinkActiveOptions: {
        queryParams: 'subset',
        matrixParams: 'subset',
        paths: 'subset',
        fragment: 'exact',
      },
    }
  ];

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.isSidenavOpened = false;
    })

    this.checkMobile(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobile(event.target.innerWidth);
  }

  checkMobile(width: any){
    if(width > 1200) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  }
  onTriggerSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

}
