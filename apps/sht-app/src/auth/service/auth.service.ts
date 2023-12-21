import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ClientSession, Model } from 'mongoose';
import {
  AppException,
  Auth,
  AuthDocument,
  NoSQLBaseService,
  ResponseOption,
  SendVerificationDto,
  SignUpDto,
  SocialSignInDto,
  User,
  UserDocument,
  Utils,
  WorkService,
} from 'shtcut/core';
import { SocialAuthService } from './social-auth.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import lang from 'apps/sht-app/lang';

@Injectable()
export class AuthService extends NoSQLBaseService {
  constructor(
    @InjectModel(Auth.name) protected model: Model<AuthDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private socialAuthService: SocialAuthService,
    protected workerService: WorkService,
    protected config: ConfigService,
  ) {
    super(model);
  }

  public async signInSocial(payload: SocialSignInDto) {
    try {
      const { auth } = await this.socialAuthService.socialSignIn(payload);
      return await this.signIn(auth);
    } catch (e) {
      throw e;
    }
  }

  public async signUp(signUpDto: SignUpDto) {
    let session: ClientSession;
    try {
      const { email, password } = signUpDto;
      let auth = await this.model.findOne({ email });
      if (auth) {
        throw AppException.CONFLICT(lang.get('auth').userExist);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const expiration = Utils.addHourToDate(1);
      const code = this.getCode();
      const filter = { email };
      const verificationCode = {
        'verificationCodes.email': { code, expiration },
      };

      session = await this.model.startSession();
      session.startTransaction();

      auth = await this.model.findOneAndUpdate(
        filter,
        {
          $setOnInsert: {
            publicId: Utils.generateUniqueId('auth'),
          },
          password: hashedPassword,
          $set: verificationCode,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
          session,
        },
      );
      await this.userModel.findOneAndUpdate(
        { ...filter },
        {
          $setOnInsert: {
            _id: auth._id,
            publicId: Utils.generateUniqueId('usr'),
          },
          ...signUpDto,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
          session,
        },
      );
      await session?.commitTransaction();
      return await this.signIn(auth);
    } catch (err) {
      if (session) {
        await session?.abortTransaction();
      }
      throw err;
    } finally {
      if (session) {
        await session?.endSession();
      }
    }
  }

  public async signIn(auth) {
    const payload = {
      email: auth.email,
      sub: auth._id,
    };
    const user = await this.userModel.findOne({ _id: auth._id, deleted: false });
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, auth: { ..._.omit(auth, ['password']), ...user.toJSON() } };
  }

  public async sendVerification(authUser, resendVerification: SendVerificationDto) {
    let session: ClientSession;
    try {
      session = await this.model.startSession();
      session.startTransaction();

      const { type } = resendVerification;
      if (authUser.verifications[type]) {
        throw AppException.CONFLICT(lang.get('auth').datVerified);
      }
      let auth = await this.model.findOne({ _id: authUser._id });
      if (!authUser[type]) {
        await this.userModel.updateOne({ _id: authUser._id }, { [type]: resendVerification[type] }, { session });
        auth[type] = resendVerification[type];
        auth = await auth.save();
      }

      const expiration = Utils.addHourToDate(1);
      const code = this.getCode();
      auth.verifications = {
        ...auth.verificationCodes,
        [type]: { code, expiration },
      };
      auth = await auth.save({ session });
      await session?.commitTransaction();
      return auth;
    } catch (err) {
      if (session) {
        await session.abortTransaction();
      }
      throw err;
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  }

  public async getResponse(option: ResponseOption) {
    if (option.email) {
      this.workerService.queueToSendEmail(option.email);
    }
    if (option.sms) {
      // todo work on queue for sms
    }
    return super.getResponse(option);
  }

  async validateUser(username: string, pass: string) {
    const auth = await this.model.findOne({ email: username }).select('+password');
    if (!auth) {
      return null;
    }

    const valid = await bcrypt.compare(pass, auth.password);
    return valid ? _.omit(auth.toJSON(), ['verifications']) : null;
  }

  public getCode() {
    return this.config.get('environment') === 'production'
      ? Utils.generateCode(6)
      : this.config.get('app.defaultVerifyCode');
  }
}
