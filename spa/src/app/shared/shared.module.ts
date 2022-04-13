import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';

@NgModule({
  declarations: [NavbarTopComponent],
  imports: [CommonModule, ButtonModule, ToolbarModule],
  exports: [NavbarTopComponent],
})
export class SharedModule {}
