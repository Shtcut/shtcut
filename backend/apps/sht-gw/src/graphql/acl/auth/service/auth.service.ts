import { Injectable } from '@nestjs/common';
import { SharedService } from '../../../../_core/services';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getGateWayProxyHeader, processServiceError } from '../../../../_core';
import { firstValueFrom } from 'rxjs';
import { POST } from 'shtcut/core';

@Injectable()
export class AuthService extends SharedService {
  constructor(
    protected readonly http: HttpService,
    protected config: ConfigService,
  ) {
    super(http, config);
    this.serviceUrl = this.config.get('microServices.app.url');
  }

  /**
   * The function sends an asynchronous POST request with authentication to a specified URL, using the
   * provided payload, parameters, and headers.
   * @param {string} url - The URL of the API endpoint you want to send the POST request to.
   * @param payload - The `payload` parameter is an object that contains the data to be sent in the
   * request body. It can be of any type, as indicated by the `Record<string, any>` type annotation.
   * @param params - The `params` parameter is an optional object that contains query parameters to be
   * appended to the URL. These parameters are used to provide additional information to the server.
   * @param headers - An object containing the headers to be included in the HTTP request.
   * @returns the response data from the HTTP request if it is successful. If there is an error, it is
   * returning the processed service error.
   */
  async sendAuthPostRequest(url: string, payload: Record<string, any>, params = {}, headers = {}) {
    try {
      const response = await firstValueFrom(
        this.http.request({
          url,
          headers: getGateWayProxyHeader(headers),
          method: POST,
          data: payload,
          params,
        }),
      );
      return response.data;
    } catch (e) {
      return processServiceError(e);
    }
  }

  /**
   * The function `signUpEmail` sends a POST request to the specified URL with the provided payload and
   * parameters for email sign-up authentication.
   * @param payload - The `payload` parameter is an object that contains the data needed for the
   * sign-up process. It typically includes information such as the user's email, password, and any
   * additional details required for registration.
   * @param params - The `params` parameter is an optional object that can contain additional
   * parameters for the API request. These parameters can include things like headers, query
   * parameters, or any other options that need to be passed along with the request.
   * @returns The `signUpEmail` function is returning the result of the `sendAuthPostRequest` function,
   * which is a promise.
   */
  async signUpEmail(payload, params = {}) {
    return this.sendAuthPostRequest(`${this.serviceUrl}/alc/auth/sign-up`, payload, params);
  }

  /**
   * The function `signInEmail` sends a POST request to the specified URL with the provided payload and
   * parameters for email authentication.
   * @param payload - The `payload` parameter is an object that contains the necessary data for signing
   * in with an email. It typically includes properties such as `email` and `password`, which are used
   * to authenticate the user.
   * @param params - The `params` parameter is an optional object that can contain additional
   * parameters for the request. These parameters can include things like headers, query parameters, or
   * any other options that need to be passed along with the request.
   * @returns The `signInEmail` function is returning the result of the `sendAuthPostRequest` function
   * call.
   */
  async signInEmail(payload, params = {}) {
    return this.sendAuthPostRequest(`${this.serviceUrl}/alc/auth/sign-in`, payload, params);
  }

  /**
   * The function `signInSocial` sends a POST request to the specified URL with the provided payload
   * and parameters for social sign-in authentication.
   * @param payload - The `payload` parameter is an object that contains the data required for the
   * social sign-in process. It typically includes information such as the user's social media provider
   * (e.g., Facebook, Google), access token, and any additional data required by the authentication
   * service.
   * @param params - The `params` parameter is an optional object that can contain additional
   * parameters for the API request. These parameters can be used to customize the behavior of the
   * request or to provide additional information to the server.
   * @returns The `signInSocial` function is returning the result of the `sendAuthPostRequest` function
   * call.
   */
  async signInSocial(payload, params = {}) {
    return this.sendAuthPostRequest(`${this.serviceUrl}/alc/auth/social`, payload, params);
  }

  /**
   * The function sends a verification request code using a POST request.
   * @param payload - The `payload` parameter is an object that contains the data to be sent in the
   * request body. It typically includes information such as the user's email or phone number for
   * verification purposes.
   * @param params - The `params` parameter is an optional object that can contain additional
   * parameters for the request. These parameters can be used to customize the behavior of the request
   * or to pass additional data to the server.
   * @returns the result of the `sendAuthPostRequest` function with the parameters
   * `${this.serviceUrl}/auth/send-verification`, `payload`, and `params`.
   */
  async sendVerifyRequestCode(payload, params = {}) {
    return this.sendAuthPostRequest(`${this.serviceUrl}/alc/auth/send-verification`, payload, params);
  }
}
