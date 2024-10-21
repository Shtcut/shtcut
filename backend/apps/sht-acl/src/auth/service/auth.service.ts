import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ClientSession, Model } from 'mongoose';
import {
  AppException,
  Auth,
  AuthDocument,
  ChangePasswordDto,
  MongoBaseService,
  PasswordResetDto,
  ResetCodeDto,
  ResponseOption,
  SendVerificationDto,
  SignUpDto,
  SocialSignInDto,
  User,
  UserDocument,
  Utils,
  VerifyEmailDto,
  WorkService,
  Workspace,
  WorkspaceDocument,
} from 'shtcut/core';
import { SocialAuthService } from './social-auth.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import lang from 'apps/sht-acl/lang';
import { UserService } from '../../user';

@Injectable()
export class AuthService extends MongoBaseService {
  constructor(
    @InjectModel(Auth.name) protected model: Model<AuthDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
    @InjectModel(Workspace.name) protected workspaceModel: Model<WorkspaceDocument>,
    private jwtService: JwtService,
    private socialAuthService: SocialAuthService,
    protected userService: UserService,
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

  public async magicLoginCallback(payload) {
    try {
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
      const payload = {
        _id: auth._id,
        ...filter,
        ...signUpDto,
      };
      await this.userService.createNewObject({ ...payload }, session);
      await session?.commitTransaction();
      return await this.signIn(auth);
    } catch (err) {
      await session?.abortTransaction();
      throw err;
    } finally {
      await session?.endSession();
    }
  }

  public async signIn(auth) {
    const payload = {
      email: auth.email,
      sub: auth._id,
    };
    const user = await this.userModel.findOne({ ...Utils.conditionWithDelete({ _id: auth._id }) });
    const workspaces = await this.workspaceModel
      .find({ ...Utils.conditionWithDelete({ user: auth._id }) })
      .select(['_id', 'name', 'slug']);
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, auth: { ...(_.omit(auth, ['password']) as Auth), ...user?.toJSON(), workspaces } };
  }

  public async sendVerification(resendVerification: SendVerificationDto) {
    let session: ClientSession;
    try {
      session = await this.model.startSession();
      session.startTransaction();
      let auth = await this.model.findOne({ email: resendVerification.email });
      const { type } = resendVerification;

      if (!auth) {
        throw AppException.CONFLICT(lang.get('error').notFound);
      }
      if (auth.verifications[type]) {
        throw AppException.CONFLICT(lang.get('auth').datVerified);
      }

      const expiration = Utils.addHourToDate(1);
      const code = this.getCode();
      auth.verificationCodes = {
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

  public async verifyEmail(payload: VerifyEmailDto) {
    try {
      let auth = await this.model.findOne({
        email: payload.email,
      });
      if (!auth) {
        throw AppException.NOT_FOUND(lang.get('error').notFound);
      }

      const canVerifyError = await this.canVerify(
        {
          verified: auth.verifications?.email,
          expiration: auth.verificationCodes?.email?.expiration,
          code: auth.verificationCodes?.email?.code,
        },
        { code: payload.verificationCode },
      );
      if (canVerifyError) {
        throw canVerifyError;
      }
      const { verifications, verificationCodes } = Utils.updateVerification(auth, 'email');
      auth.verifications = verifications;
      auth.verificationCodes = verificationCodes;
      auth = await auth.save();
      const { accessToken, auth: authUser } = await this.signIn(auth);
      return { auth: authUser, accessToken };
    } catch (e) {
      throw e;
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
    return valid ? _.omit(auth.toJSON(), ['verificationCodes']) : null;
  }

  public async requestPasswordRequest(payload: ResetCodeDto) {
    const auth = await this.model.findOne({ email: payload.email });
    if (!auth) {
      throw AppException.NOT_FOUND(lang.get('error').notFound);
    }
    const expiration = Utils.addHourToDate(1);
    const code = this.getCode();
    auth.verificationCodes = {
      ...auth.verificationCodes,
      resetPassword: { code, expiration },
    };
    return auth.save();
  }

  public async resetPassword(payload: PasswordResetDto) {
    const auth = await this.model.findOne({ email: payload.email });
    if (!auth) {
      throw AppException.NOT_FOUND(lang.get('error').notFound);
    }

    const canResetError = await this.cannotResetPassword(
      {
        code: auth.verificationCodes?.resetPassword?.code,
        expiration: auth.verificationCodes?.resetPassword?.expiration,
      },
      { code: payload.resetPasswordCode },
    );

    if (canResetError) {
      throw canResetError;
    }

    auth.password = await bcrypt.hash(payload.password, 10);
    auth.verificationCodes = _.omit({ ...auth.verificationCodes }, ['resetPassword']);
    return await auth.save();
  }

  public async cannotResetPassword(authData: { code: string; expiration: Date }, { code }: { code: string }) {
    if (!authData.code) {
      return AppException.UNAUTHORIZED(lang.get('error').unAuthorized);
    }
    if (authData.code !== code) {
      return AppException.UNAUTHORIZED(lang.get('auth').invalidCode);
    }
    if (new Date() > new Date(authData.expiration)) {
      return AppException.UNAUTHORIZED(lang.get('auth').expiredCode);
    }
    return null;
  }

  public async canVerify(authData: { verified: boolean; expiration: Date; code: string }, payload: { code: string }) {
    if (authData.verified) {
      throw AppException.UNAUTHORIZED(lang.get('auth').dataVerified);
    }
    if (payload.code) {
      if (authData.code !== payload.code) {
        return AppException.UNAUTHORIZED(lang.get('auth').invalidCode);
      }
      if (new Date() > new Date(authData.expiration)) {
        return AppException.UNAUTHORIZED(lang.get('auth').expiredCode);
      }
    }
    return null;
  }

  public async changePassword(authId: string, payload: ChangePasswordDto) {
    let auth = await this.model.findById(authId).select('+password');
    const isAuthenticated = await bcrypt.compare(payload.currentPassword, auth.password);
    if (!isAuthenticated) {
      throw AppException.UNAUTHORIZED(lang.get('auth').invalidUser);
    }
    auth.password = await bcrypt.hash(payload.password, 10);
    auth = await auth.save();
    return _.omit(auth, ['password', 'verificationCodes']);
  }

  public getCode() {
    return this.config.get('environment') === 'production'
      ? Utils.generateCode(6)
      : this.config.get('app.defaultVerifyCode');
  }
}
