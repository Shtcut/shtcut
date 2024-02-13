import { JwtAuthGuard } from '../../../../../libs/core/src/shared/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Controller, HttpCode, Next, Post, Req, Res, Body, UseGuards, Get } from '@nestjs/common';
import { AdminAuthService } from '../service/admin-auth.service';
import { AdminAuth, CurrentUser, LocalAuthGuard, OK, QueryParser, SignInDto } from 'shtcut/core';
import { NextFunction, Request, Response } from 'express';

@Controller('auth')
export class AdminAuthController {
  constructor(
    protected service: AdminAuthService,
    protected config: ConfigService,
  ) {}

  @Post('/init')
  @HttpCode(OK)
  public async init(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const { accessToken, auth } = await this.service.initAdminUser(req.body);
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
  @Post('/login')
  @HttpCode(OK)
  public async login(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const { accessToken, auth } = this.service.login(req.user as AdminAuth);
      const response = await this.service.getResponse({
        token: accessToken,
        code: OK,
        value: auth,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @HttpCode(OK)
  public async getMe(
    @CurrentUser() authUser: any,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const response = await this.service.getResponse({
        code: OK,
        value: authUser,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }
}
