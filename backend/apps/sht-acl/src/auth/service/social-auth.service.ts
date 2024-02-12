import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-shtner/lang';
import { ClientSession, Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { AppException, Auth, AuthDocument, SocialSignInDto, SocialType, User, UserDocument, Utils } from 'shtcut/core';
import * as _ from 'lodash';

@Injectable()
export class SocialAuthService {
  constructor(
    @InjectModel(Auth.name) protected model: Model<AuthDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
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
        user = new this.userModel({
          _id: authObject._id,
          ...socialPayload,
        });
        await user.save({ session });
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
   * The `loginSocial` function handles social login authentication by making API requests to different
   * social platforms based on the provided `socialType` and `accessToken`.
   * @param  - - `socialType`: A string representing the type of social login (e.g., "google", "apple",
   * "facebook").
   * @returns a Promise that resolves to an object containing the user's social login information.
   */
  public async loginSocial({ socialType, accessToken }: { socialType: string; accessToken: string }) {
    let url: string;

    if (socialType === SocialType.GOOGLE) {
      url = `${this.config.get('app.social.google.url')}?access_token=${accessToken}`;
    } else if (socialType === SocialType.APPLE) {
      return Promise.resolve({ id: this.config.get('app.social.apple.url') });
    } else {
      url = `${this.config.get('app.social.facebook.url')}&access_token=${accessToken}`;
    }
    try {
      const response = await lastValueFrom(this.http.get(url));
      if (socialType === SocialType.GOOGLE) {
        response.data.id = response.data.sub;
      }

      if (response.data && response.data.id) {
        return response.data;
      } else {
        throw AppException.FORBIDDEN(lang.get('auth').socialError);
      }
    } catch (err) {
      if (err.response && err.response.data) {
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
    } else if (socialType === SocialType.GOOGLE) {
      socialData = {
        email: response.email || auth.email || '',
        firstName: auth.firstName || response.given_name || '',
        lastName: auth.lastName || response.family_name || '',
      };
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
}
