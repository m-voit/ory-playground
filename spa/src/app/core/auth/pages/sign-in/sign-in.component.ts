import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInFlow: any;

  signInForm = this.fb.group({
    identifier: [''],
    password: [''],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.signInFlow = await this.authService.startSignInFlow();
  }

  async signIn(): Promise<void> {
    const signInForm = this.signInForm.value;

    const signInData = {
      csrf_token: this.signInFlow?.ui.nodes[0].attributes.value,
      method: 'password',
      identifier: signInForm.identifier,
      password: signInForm.password,
    };

    await this.authService.submitSignInFlow(this.signInFlow.id, signInData);
  }
}
