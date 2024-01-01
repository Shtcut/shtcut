import { Body, Controller, HttpCode, Next, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../service';
import { ConfigService } from '@nestjs/config';
import {
  Auth,
  ChangePasswordDto,
  CurrentUser,
  JwtAuthGuard,
  LocalAuthGuard,
  OK,
  PasswordResetDto,
  QueryParser,
  ResetCodeDto,
  SendVerificationDto,
  SignInDto,
  SignUpDto,
  SocialSignInDto,
  VerifyEmailDto,
} from 'shtcut/core';
import { NextFunction, Request, Response } from 'express';
import { AuthEmail } from '../auth.email';
import * as _ from 'lodash';
import lang from 'apps/sht-app/lang';

@Controller('auth')
export class AuthController {
  constructor(
    protected service: AuthService,
    protected config: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/authenticate')
  @HttpCode(OK)
  public async authenticate(
    @CurrentUser() auth: Auth,
    @Req() @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const response = await this.service.getResponse({
        code: OK,
        value: auth,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Post('/social')
  @HttpCode(OK)
  public async social(
    @Body() payload: SocialSignInDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const { accessToken, auth } = await this.service.signInSocial(payload);

      const filter: Record<string, any> = {
        email: await AuthEmail.sendWelcomeEmail(
          {
            from: this.config.get<string>('worker.email.sendgrid.fromEmail'),
            template: this.config.get<string>('app.templates.email.welcome'),
          },
          auth,
        ),
      };

      const response = await this.service.getResponse({
        token: accessToken,
        queryParser,
        ...filter,
        code: OK,
        value: auth,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Post('/sign-up')
  @HttpCode(OK)
  public async signUp(
    @Body() payload: SignUpDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const { accessToken, auth } = await this.service.signUp(payload);
      const email = await AuthEmail.sendEmail({
        to: auth.email,
        from: this.config.get<string>('worker.email.sendgrid.fromEmail'),
        template: this.config.get<string>('app.templates.email.welcome'),
        code: auth.verificationCodes?.email?.code,
      });
      const response = await this.service.getResponse({
        token: accessToken,
        email,
        queryParser,
        code: OK,
        value: auth,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  @HttpCode(OK)
  public async signIn(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const { accessToken, auth } = await this.service.signIn(req.user);
      const response = await this.service.getResponse({
        token: accessToken,
        queryParser,
        code: OK,
        hiddenFields: ['verificationCodes', 'password'],
        value: auth,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Post('/send-verification')
  @HttpCode(OK)
  public async sendVerification(
    @Body() payload: SendVerificationDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const auth = await this.service.sendVerification(payload);

      const filter: Record<string, any> = {
        email: await AuthEmail.sendEmail({
          to: auth.email,
          from: this.config.get<string>('worker.email.sendgrid.fromEmail'),
          template: this.config.get<string>('app.templates.email.verify'),
          code: auth.verificationCodes?.email?.code,
        }),
      };

      const response = await this.service.getResponse({
        code: OK,
        ...filter,
        message: lang.get('auth').sendVerification,
        hiddenFields: ['verificationCodes', 'password'],
        value: {
          ..._.pick(auth, ['verifications', '_id']),
        },
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Post('/verify-email')
  @HttpCode(OK)
  public async verifyEmail(
    @Body() payload: VerifyEmailDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const { accessToken, auth } = await this.service.verifyEmail(payload);
      const email = await AuthEmail.sendWelcomeEmail(
        {
          from: this.config.get<string>('worker.email.sendgrid.fromEmail'),
          template: this.config.get<string>('app.templates.email.verify'),
          subject: 'Shtcut -  Welcome Email',
        },
        auth,
      );
      const response = await this.service.getResponse({
        queryParser,
        email,
        token: accessToken,
        code: OK,
        value: auth,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Post('/password-reset')
  @HttpCode(OK)
  public async passwordReset(
    @Body() payload: ResetCodeDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const auth = await this.service.requestPasswordRequest(payload);
      const email = await AuthEmail.sendEmail({
        to: auth.email,
        from: this.config.get<string>('worker.email.sendgrid.fromEmail'),
        template: this.config.get<string>('app.templates.email.passwordReset'),
        subject: 'Shtcut -  Reset Password',
        type: 'password-reset',
        code: auth?.verificationCodes?.resetPassword?.code,
      });
      const response = await this.service.getResponse({
        queryParser,
        email,
        code: OK,
        value: {
          email: auth.email,
          success: true,
        },
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Post('/reset-password')
  @HttpCode(OK)
  public async resetPassword(
    @Body() payload: PasswordResetDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const auth = await this.service.resetPassword(payload);
      const response = await this.service.getResponse({
        code: OK,
        message: lang.get('auth').passwordReset,
        value: {
          email: auth.email,
          success: true,
        },
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  @HttpCode(OK)
  public async changePassword(
    @CurrentUser() authUser: Auth,
    @Body() payload: ChangePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const auth = await this.service.changePassword(authUser['_id'], payload);
      const response = await this.service.getResponse({
        code: OK,
        message: lang.get('auth').passwordChanged,
        value: {
          email: auth.email,
          success: true,
        },
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }
}
