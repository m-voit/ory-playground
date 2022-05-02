import { Injectable } from '@angular/core';
import { Configuration, V0alpha2Api as KratosApi } from '@ory/client';
import { AUTH_CONSTANT } from '../constants/auth.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Initialize the Kratos client by setting the URL where Kratos is hosted.
  private readonly kratosClient = new KratosApi(
    new Configuration({ basePath: AUTH_CONSTANT.oryKratos.basePath })
  );

  constructor() {}

  /**
   * Check if the user is authenticated by checking if there is an active Kratos session.
   *
   * @returns If the user session is active.
   */
  async isUserAuthenticated() {
    const { data } = await this.kratosClient.toSession();

    return data.active;
  }

  /**
   * Start the Kratos sign in flow.
   * This will redirect the user to the Kratos sign in page.
   *
   * @returns The data required to render a custom sign in page.
   */
  public async startSignInFlow() {
    const { data } =
      await this.kratosClient.initializeSelfServiceLoginFlowForBrowsers();

    return data;
  }

  /**
   * Complete the Kratos sign in flow with the users sign in data from the sign in page.
   *
   * @param action The action to submit the form data to. This is the action returned by the Kratos
   * @param data The sign in data to submit.
   * @returns If successful it will return 200 and set a session cookie
   * otherwise it will return validation errors to be displayed in the sign in page.
   */
  public async submitSignInFlow(action: string, data: any) {
    const response = await this.kratosClient.submitSelfServiceLoginFlow(
      action,
      undefined,
      data
    );

    return response.status === 200;
  }

  /**
   * Log out the user using the Kratos logout flow.
   * This will invalidate the user session and redirect the user to the Kratos logout page.
   *
   * @returns The logout URL if the user is authenticated, otherwise an empty string.
   */
  public async logout() {
    if (await this.isUserAuthenticated()) {
      const { data } =
        await this.kratosClient.createSelfServiceLogoutFlowUrlForBrowsers();

      return data.logout_url;
    } else {
      return null;
    }
  }
}
