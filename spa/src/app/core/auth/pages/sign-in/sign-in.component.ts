import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginFlow = {};

  constructor(private readonly authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.loginFlow = await this.authService.login();

    console.log(this.loginFlow);
  }
}
