import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, SignOutComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  exports: [],
})
export class AuthModule {}
