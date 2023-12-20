import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Auth, AuthDocument, NoSQLBaseService, SocialSignInDto, User, UserDocument, WorkService } from 'shtcut/core';
import { SocialAuthService } from './social-auth.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

@Injectable()
export class AuthService extends NoSQLBaseService {
  constructor(
    @InjectModel(Auth.name) protected model: Model<AuthDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private socialAuthService: SocialAuthService,
    protected workerService: WorkService,
    protected configService: ConfigService,
  ) {
    super(model);
  }

  /**
   * The function signInSocial is an asynchronous function that takes a payload of type
   * SocialSignInDto, calls the socialSignIn method of the socialAuthService, and then calls the signIn
   * method with the returned auth object.
   * @param {SocialSignInDto} payload - The payload parameter is an object of type SocialSignInDto. It
   * likely contains information related to social sign-in, such as the user's social media account
   * details or access token.
   * @returns The `signInSocial` function is returning the result of the `signIn` function, which is
   * called with the `auth` object obtained from the `socialSignIn` method of the `socialAuthService`.
   */
  public async signInSocial(payload: SocialSignInDto) {
    try {
      const { auth } = await this.socialAuthService.socialSignIn(payload);
      return this.signIn(auth);
    } catch (e) {
      throw e;
    }
  }

  /**
   * The function `signIn` takes an authentication object, creates a payload with the email and _id
   * properties, signs the payload using a JWT service, and returns an object with the accessToken and
   * the original authentication object.
   * @param auth - The `auth` parameter is an object that contains information about the user's
   * authentication. It typically includes properties such as `email` and `_id` (which represents the
   * user's unique identifier).
   * @returns an object with two properties: "accessToken" and "auth". The value of "accessToken" is
   * the result of calling the "sign" method of the "jwtService" object with the "payload" object as an
   * argument. The value of "auth" is the same as the input parameter "auth".
   */
  public signIn(auth) {
    const payload = {
      email: auth.email,
      sub: auth._id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      auth,
    };
  }

  async validateUser(username: string, pass: string) {
    const auth = await this.model.findOne({ email: username }).select('+password');
    if (!auth) {
      return null;
    }

    const valid = await bcrypt.compare(pass, auth.password);
    return valid ? _.omit(auth.toJSON(), ['verifications']) : null;
  }
}
