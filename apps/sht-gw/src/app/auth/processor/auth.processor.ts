import { Injectable } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthProcessor {
  constructor(private readonly authService: AuthService) {}

  /**
   * The `signIn` function asynchronously signs in a user using their email and returns the metadata
   * and data associated with the sign-in process.
   * @param payload - The `payload` parameter is an object that contains the necessary information for
   * signing in. It typically includes properties such as email and password.
   * @param [query] - The `query` parameter is an optional parameter that can be passed to the `signIn`
   * function. It is used to provide additional information or options for the sign-in process.
   * @returns An object containing the properties "meta" and "data" is being returned.
   */
  async signIn(payload, query?) {
    const { meta, data } = await this.authService.signInEmail(payload, query);
    return { meta, data };
  }

  /**
   * The signUp function signs up a user using their email and returns the metadata and data associated
   * with the sign up process.
   * @param payload - The `payload` parameter is an object that contains the necessary information for
   * signing up a user. It typically includes properties such as email, password, and any other
   * required user details.
   * @param [query] - The `query` parameter is an optional parameter that can be passed to the `signUp`
   * function. It is used to provide additional information or options for the sign-up process.
   * @returns An object containing the properties "meta" and "data" is being returned.
   */
  async signUp(payload, query?) {
    const { meta, data } = await this.authService.signUpEmail(payload, query);
    return { meta, data };
  }

  /**
   * The function signInSocial signs in a user using social authentication and returns the metadata and
   * data associated with the user.
   * @param payload - The `payload` parameter is an object that contains the necessary information for
   * signing in with a social media account. This could include details such as the user's social media
   * provider (e.g., Facebook, Google), access tokens, and any additional data required for
   * authentication.
   * @param query - The `query` parameter is an object that contains additional information or
   * parameters that can be passed to the `signInSocial` method. It is used to provide additional
   * context or customization for the social sign-in process.
   * @returns an object with two properties: "meta" and "data".
   */
  async signInSocial(payload, query?) {
    const { meta, data } = await this.authService.signInSocial(payload, query);
    return { meta, data };
  }

  /**
   * The function sends a verification code using the authService and returns the metadata and data.
   * @param payload - The payload parameter is an object that contains the necessary data for sending a
   * verification code. It could include information such as the user's email or phone number.
   * @param [query] - The `query` parameter is an optional parameter that can be passed to the
   * `sendVerificationCode` function. It is used to provide additional information or filters for the
   * verification code request.
   * @returns an object with two properties: "meta" and "data".
   */
  async sendVerificationCode(payload, query?) {
    const { meta, data } = await this.authService.sendVerifyRequestCode(payload);
    return { meta, data };
  }
}
