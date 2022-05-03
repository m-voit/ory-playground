import { Injectable } from '@angular/core';
import { Configuration, V0alpha2Api as KratosApi } from '@ory/client';
import { AUTH_CONSTANT } from '../constants/auth.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly kratosConfig: Configuration;
  private readonly kratosClient: KratosApi;

  constructor() {
    // Initialize the Kratos client by setting the URL where Kratos is hosted.
    // and set with credentials to true, so the session cookie is sended alongside the requests.
    this.kratosConfig = new Configuration({
      basePath: AUTH_CONSTANT.oryKratos.basePath,
      baseOptions: {
        withCredentials: true,
      },
    });

    this.kratosClient = new KratosApi(this.kratosConfig);
  }

  /**
   * Check if the user is authenticated by checking if there is an active Kratos session.
   *
   * @returns If the user session is active.
   */
  async isUserAuthenticated() {
    const { data } = await this.kratosClient.toSession();

    return data?.active ?? false;
  }

  /**
   * Start the Kratos sign up flow.
   * This will redirect the user to the sign up page registered in Kratos.
   *
   * @returns The data required to render a custom sign up page.
   */
  public async startSignUpFlow() {
    const { data } =
      await this.kratosClient.initializeSelfServiceRegistrationFlowForBrowsers();

    return data;
  }

  /**
   * Complete the Kratos sign up flow with the users sign up data from the sign up page.
   *
   * @param flowId The id of the Kratos sign up flow. This is required, so Kratos knows which flow to complete.
   * @param data The sign up data to submit.
   *
   * @returns If successful it will return 200 and set a session cookie
   * otherwise it will return validation errors to be displayed in the sign up page.
   */
  public async submitSignUpFlow(flowId: string, data: any) {
    const response = await this.kratosClient.submitSelfServiceRegistrationFlow(
      flowId,
      data
    );

    return response.status === 200;
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
   * @param flowId The id of the Kratos sign in flow. This is required, so Kratos knows which flow to complete.
   * @param data The sign in data to submit.
   *
   * @returns If successful it will return 200 and set a session cookie
   * otherwise it will return validation errors to be displayed in the sign in page.
   */
  public async submitSignInFlow(flowId: string, data: any) {
    const response = await this.kratosClient.submitSelfServiceLoginFlow(
      flowId,
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
  public async startSignOutFlow() {
    if (await this.isUserAuthenticated()) {
      const { data } =
        await this.kratosClient.createSelfServiceLogoutFlowUrlForBrowsers();

      return data.logout_url;
    } else {
      return '';
    }
  }
}
