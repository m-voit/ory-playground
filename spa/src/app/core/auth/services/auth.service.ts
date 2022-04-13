import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration, V0alpha2Api } from '@ory/kratos-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly kratosClient = new V0alpha2Api();
  private logoutUrl = '';
  private identity = {};

  constructor(private readonly http: HttpClient) {}

  isUserLoggedIn() {
    this.http.get('/sessions/whoami').subscribe((value: any) => {
      if (value.statusCode === 200) {
        this.identity = value.data;
        return true;
      }

      return false;
    });
  }

  public async login() {
    // const configuration = new Configuration();
    // configuration.username = username;
    // configuration.password = password;
    // configuration.basePath = 'http://localhost:8080';
    // configuration.apiKey = {
    //   type: 'header',
    //   name: 'Authorization',
    // };
    const { data } =
      await this.kratosClient.initializeSelfServiceLoginFlowForBrowsers();

    console.log(data);

    // return token.access_token;
  }

  public async logout() {
    const { data } =
      await this.kratosClient.createSelfServiceLogoutFlowUrlForBrowsers();

    this.logoutUrl = data.logout_url;
  }
}
