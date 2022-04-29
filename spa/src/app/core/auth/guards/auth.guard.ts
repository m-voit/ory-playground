import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private readonly authService: AuthService) {}

  /**
   * Check if the user is authenticated.
   *
   * @returns True when the user is authenticated, otherwise false.
   */
  async canLoad(): Promise<boolean> {
    return await this.authService.isUserAuthenticated();
  }
}
