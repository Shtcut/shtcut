/* eslint-disable prefer-const */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AppException, Auth, AuthDocument, SocialSignInDto, SocialType, User, UserDocument, Utils } from 'shtcut/core';
import * as _ from 'lodash';
import lang from 'apps/sht-acl/lang';
import { UserService } from '../../user';

@Injectable()
export class SocialAuthService {
  constructor(
    @InjectModel(Auth.name) protected model: Model<AuthDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
    private userService: UserService,
    private http: HttpService,
    protected config: ConfigService,
  ) {}

  /**
   * The function `socialSignIn` handles the sign-in process for social media accounts, creating or
   * updating authentication and user data.
   * @param {SocialSignInDto} payload - The `payload` parameter is an object of type `SocialSignInDto`.
   * It contains the data required for social sign-in, such as the social type (e.g., Facebook,
   * Google), and any additional data specific to the social sign-in method.
   * @returns an object with two properties: "auth" and "socialPayload".
   */
  public async socialSignIn(payload: SocialSignInDto) {
    let session: ClientSession | undefined;

    try {
      session = await this.model.startSession();
      session.startTransaction();

      const { socialType } = payload;
      const socialData = await this.loginSocial({ ...payload });

      if (!socialData.email) {
        throw AppException.INVALID_INPUT(lang.get('auth').socialEmailRequired);
      }

      let [auth, user] = await Promise.all([
        this.model.findOne({ social_id: socialData.socialIid, email: socialData.email }),
        this.userModel.findOne({ email: socialData.email }),
      ]);

      if (!auth) {
        auth = new this.model({
          ...payload,
          publicId: Utils.generateUniqueId('auth'),
        });
      }

      const { authObject, socialPayload } = await this.signInSocial(socialData, auth, socialType);
      auth = await authObject.save();

      if (!user) {
        const payload = {
          _id: auth._id,
          ...socialData,
        };
        await this.userService.createNewObject({ ...payload }, session);
      }

      await session.commitTransaction();

      return { auth, user, socialPayload };
    } catch (e) {
      if (session) {
        await session.abortTransaction();
      }
      throw e;
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  }

  /**
   * The function `loginSocial` handles social login authentication for different social platforms like
   * Google, Apple, GitHub, and Facebook.
   * @param  - The `loginSocial` function is an asynchronous function that handles social media login
   * functionality. It takes in two parameters: `socialType` which is a string representing the type of
   * social media platform (e.g., GOOGLE, APPLE, GITHUB, FACEBOOK) and `accessToken` which is a string
   * @returns The function `loginSocial` returns the data object from the response if it contains an
   * `id` property. If the response data does not contain an `id` property, it throws a `FORBIDDEN`
   * error with a social error message. If there is an error with the response or an internal server
   * error occurs, it throws a `FORBIDDEN` error with an appropriate error message.
   */
  public async loginSocial({ socialType, accessToken }: { socialType: string; accessToken: string }) {
    try {
      let url: string;

      switch (socialType) {
        case SocialType.GOOGLE:
          url = `${this.config.get('app.social.google.userInfoUrl')}`;
          return this.processGoogleUser(url, accessToken);
        case SocialType.APPLE:
          return Promise.resolve({ id: this.config.get('app.social.apple.url') });
        case SocialType.GITHUB:
          url = `${this.config.get('app.social.github.url')}`;
          return this.processGithubUser(url, accessToken);
        case SocialType.TWITTER:
          return Promise.resolve({ id: this.config.get('app.social.twitter.url') });
        default:
          url = `${this.config.get('app.social.facebook.url')}&access_token=${accessToken}`;
      }

      const response = await lastValueFrom(this.http.get(url));

      if (response.data?.id) {
        return response.data;
      } else {
        throw AppException.FORBIDDEN(lang.get('auth').socialError);
      }
    } catch (err) {
      if (err.response?.data) {
        const errorMessage = err.response?.data?.error?.message || err.response.data.error_description;
        throw AppException.FORBIDDEN(errorMessage);
      }

      throw AppException.INTERNAL_SERVER(lang.get('error').internalServer);
    }
  }

  /**
   * The function `signInSocial` takes in a response object, an auth object, and a socialType string,
   * and returns an updated auth object and a socialPayload object.
   * @param {any} response - The `response` parameter is an object that contains the data returned from
   * the social media authentication provider (e.g., Facebook or Google).
   * @param {any} auth - The `auth` parameter is an object that contains user authentication data. It
   * may have properties such as `email`, `firstName`, `lastName`, `accountVerified`, `active`,
   * `socialId`, `socialAuth`, `socialType`, and `verifications`.
   * @param {string} socialType - The `socialType` parameter is a string that represents the type of
   * social media platform being used for authentication. It can have two possible values: "FACEBOOK"
   * or "GOOGLE".
   * @returns an object with two properties: "authObject" and "socialPayload".
   */
  async signInSocial(response: any, auth: any, socialType: string) {
    let socialData = {
      email: '',
      firstName: '',
      lastName: '',
    };

    if (socialType === SocialType.FACEBOOK) {
      socialData = {
        email: response.email || auth.email || '',
        firstName: auth.firstName || response.first_name || '',
        lastName: auth.lastName || response.last_name || '',
      };
    } else if (socialType === SocialType.GOOGLE || socialType === SocialType.GITHUB) {
      socialData = { ...response };
    }

    _.extend(auth, {
      accountVerified: true,
      active: true,
      socialId: response.id,
      socialAuth: true,
      socialType,
      ...socialData,
    });

    if (socialData.email) {
      _.extend(auth, {
        verifications: {
          ...auth.verifications,
          email: true,
        },
      });
    }

    return {
      authObject: auth,
      socialPayload: socialData,
    };
  }

  /**
   * The function `processGithubUser` retrieves user information from GitHub using an access token and
   * returns the user's id, first name, last name, and email.
   * @param url - The `url` parameter in the `processGithubUser` function is typically the URL to which
   * the HTTP requests are made. In this case, it is the URL for the GitHub API endpoint that you are
   * interacting with. This URL could be something like `https://api.github.com/user` or any
   * @param accessToken - An access token is a unique string of letters and numbers that is used to
   * authenticate and authorize API requests. It is typically obtained by the user during the OAuth
   * authentication process and grants access to specific resources on a server. In the context of the
   * `processGithubUser` function you provided, the `accessToken
   * @returns The `processGithubUser` function is returning an object with the following properties:
   * - id: The GitHub user's ID
   * - firstName: The first name of the GitHub user (extracted from the user's full name)
   * - lastName: The last name of the GitHub user (extracted from the user's full name)
   * - email: The email address of the GitHub user (retrieved from
   */
  private async processGithubUser(url, accessToken) {
    const { apiKey, secret, userInfoUrl } = this.config.get('app.social.github');
    const payload = {
      client_id: apiKey,
      client_secret: secret,
      code: accessToken,
    };
    const response = await firstValueFrom(this.http.post(url, payload));
    const token = response.data.split('=')[1].split('&')[0];
    const [githubUserResponse, githubEmailResponse] = await Promise.all([
      await firstValueFrom(
        this.http.get(userInfoUrl, {
          headers: {
            Authorization: `token ${token}`,
          },
        }),
      ),
      await firstValueFrom(
        this.http.get(`${userInfoUrl}/emails`, {
          headers: {
            Authorization: `token ${token}`,
          },
        }),
      ),
    ]);
    const { data } = githubUserResponse;
    const user = {
      socialId: data.id,
      firstName: data?.name?.split(' ')[0] ?? data.login,
      lastName: data?.name?.split(' ')[1] ?? data.login,
      email: githubEmailResponse.data[0].email,
    };
    return user;
  }

  private async processGoogleUser(url, accessToken) {
    const response = await firstValueFrom(
      this.http.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );
    const { data } = response;
    return {
      socialId: data.sub,
      email: data.email,
      firstName: data.given_name ?? data?.name?.spilt(' ')[0],
      lastName: data.family_name ?? data?.name?.spilt(' ')[1],
    };
  }
}
