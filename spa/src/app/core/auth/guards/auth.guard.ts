import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  /**
   * Check if the user is authenticated.
   *
   * @returns True when the user is authenticated, otherwise false.
   */
  canActivate(): boolean {
    return this.authService.isUserAuthenticated();
  }
}
