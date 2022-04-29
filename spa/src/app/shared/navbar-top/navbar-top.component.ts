import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
})
export class NavbarTopComponent {
  constructor(private router: Router) {}

  public async navigateToSignIn() {
    this.router.navigate([`auth/sign-in`]);
  }
}
