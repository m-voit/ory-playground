import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';

@NgModule({
  declarations: [NavbarTopComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
  ],
  exports: [
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarTopComponent,
    InputTextModule,
  ],
})
export class SharedModule {}
