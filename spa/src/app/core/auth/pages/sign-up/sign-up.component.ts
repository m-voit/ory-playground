import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpFlow!: any;
  csrfToken = '';

  signUpForm = this.fb.group({
    traitsEmail: [''],
    password: [''],
    traitsFirstName: [''],
    traitsLastName: [''],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.signUpFlow = await this.authService.startSignUpFlow();
    this.csrfToken = this.signUpFlow?.ui.nodes[0].attributes.value;

    console.log(this.signUpFlow);
  }

  async signUp() {
    const signUpForm = this.signUpForm.value;

    const signUpData = {
      csrf_token: this.csrfToken,
      method: 'password',
      password: signUpForm.password,
      traits: {
        email: signUpForm.traitsEmail,
        name: {
          first: signUpForm.traitsFirstName,
          last: signUpForm.traitsLastName,
        },
      },
    };

    await this.authService.submitSignUpFlow(this.signUpFlow.id, signUpData);
  }
}
