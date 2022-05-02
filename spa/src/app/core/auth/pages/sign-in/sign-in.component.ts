import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SelfServiceLoginFlow } from '@ory/client';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginFlow!: SelfServiceLoginFlow;

  signInForm = this.fb.group({
    csrf_token: [''],
    identifier: [''],
    password: [''],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loginFlow = await this.authService.startSignInFlow();

    console.log(this.loginFlow.ui.nodes);
  }

  async signIn(): Promise<void> {
    const loggedInSuccessfully = await this.authService.submitSignInFlow(
      this.loginFlow.ui.action,
      this.signInForm.getRawValue()
    );
  }
}
