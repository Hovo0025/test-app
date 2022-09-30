import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';

import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../core/material/material.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    LeftMenuComponent
  ],
  exports: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: []
})
export class MainLayoutModule {
}
