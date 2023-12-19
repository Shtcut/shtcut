import { Body, Controller, HttpCode, Next, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../service';
import { ConfigService } from '@nestjs/config';
import { OK, QueryParser, SocialSignInDto } from 'shtcut/core';
import { NextFunction, Request, Response } from 'express';

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
}
