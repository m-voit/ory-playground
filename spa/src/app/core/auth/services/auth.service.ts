import { Injectable } from '@angular/core';
import { Configuration, V0alpha2Api } from '@ory/kratos-client';
import { AUTH_CONSTANT } from '../constants/auth.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly kratosClient: V0alpha2Api;

  constructor() {
    this.kratosClient = new V0alpha2Api(
      new Configuration({ basePath: AUTH_CONSTANT.oryKratos.basePath })
    );
  }

  isUserAuthenticated() {
    // this.http.get('/sessions/whoami').subscribe((value: any) => {
    //   if (value.statusCode === 200) {
    //     this.identity = value.data;
    //     return true;
    //   }
    //   return false;
    // });

    return true;
  }

  public async login() {
    const { data } =
      await this.kratosClient.initializeSelfServiceLoginFlowForBrowsers();

    console.log(data);

    return data;
  }

  public async logout() {
    const { data } =
      await this.kratosClient.createSelfServiceLogoutFlowUrlForBrowsers();

    return data;
  }
}
