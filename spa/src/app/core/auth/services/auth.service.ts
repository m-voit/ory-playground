import { Injectable } from '@angular/core';
import { Configuration, V0alpha2Api as KratosApi } from '@ory/client';
import { AUTH_CONSTANT } from '../constants/auth.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly kratosClient: KratosApi;

  constructor() {
    this.kratosClient = new KratosApi(
      new Configuration({ basePath: AUTH_CONSTANT.oryKratos.basePath })
    );
  }

  async isUserAuthenticated() {
    return true;
  }

  public async login() {
    const { data } =
      await this.kratosClient.initializeSelfServiceLoginFlowForBrowsers();

    return data;
  }

  public async logout() {
    const { data } =
      await this.kratosClient.createSelfServiceLogoutFlowUrlForBrowsers();

    return data;
  }
}
