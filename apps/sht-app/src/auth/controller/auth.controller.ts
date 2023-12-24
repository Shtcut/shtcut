import { Body, Controller, HttpCode, Next, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../service';
import { ConfigService } from '@nestjs/config';
import {
  Auth,
  CurrentUser,
  JwtAuthGuard,
  LocalAuthGuard,
  OK,
  QueryParser,
  SendVerificationDto,
  SignInDto,
  SignUpDto,
  SocialSignInDto,
} from 'shtcut/core';
import { NextFunction, Request, Response } from 'express';
import { AuthEmail } from '../auth.email';

@Controller('auth')
export class AuthController {
  constructor(
    protected service: AuthService,
    protected config: ConfigService,
  ) {}

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
            from: this.config.get<string>('app.fromEmail'),
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
      const response = await this.service.getResponse({
        token: accessToken,
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
  public async signIn(
    @Body() payload: SignInDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const { accessToken, auth } = await this.service.signIn(req.user);
      const response = await this.service.getResponse({
        token: accessToken,
        queryParser,
        code: OK,
        value: auth,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/send-verification')
  @HttpCode(OK)
  public async sendVerification(
    @CurrentUser() authUser: Auth,
    @Body() payload: SendVerificationDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const auth = await this.service.sendVerification(authUser, payload);
      const { type } = payload;
      const isMobile = type === 'mobile';

      let filter: Record<string, any> = {
        email: await AuthEmail.verifyEmail(
          {
            from: this.config.get<string>('app.fromEmail'),
            template: this.config.get<string>('app.templates.email.verify'),
            code: auth.verificationCodes?.email?.code,
          },
          auth,
        ),
      };

      if (isMobile) {
        // todo work on mobile verification
        filter = {};
      }

      const response = await this.service.getResponse({
        code: OK,
        ...filter,
        hiddenFields: ['verifications', 'password'],
        value: auth,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }
}
