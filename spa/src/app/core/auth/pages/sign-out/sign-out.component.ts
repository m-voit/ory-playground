import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent implements OnInit {
  logoutUrl = '';

  constructor(private readonly authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.logoutUrl = await this.authService.startSignOutFlow();

    // Redirect the user to the logout page.
    window.location.href = this.logoutUrl;
  }
}
