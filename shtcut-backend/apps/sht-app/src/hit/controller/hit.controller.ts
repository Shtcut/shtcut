import { Body, Controller, Get, HttpCode, Next, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AppController, Auth, CurrentUser, JwtAuthGuard, OK, QueryParser, UpdateUserDto } from 'shtcut/core';
import { UserService } from '../service/hit.service';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController extends AppController {
  constructor(
    protected service: UserService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @Put('/me')
  @HttpCode(OK)
  public async updateMe(
    @CurrentUser() authUser: Auth,
    @Body() payload: UpdateUserDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    super.update(authUser['_id'], payload, req, res, next);
  }

  @Get('/me')
  @HttpCode(OK)
  public async getLoggedInUser(
    @CurrentUser() authUser: Auth,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const user = await this.service.findObject(String(authUser['_id']));
      const response = await this.service.getResponse({
        code: OK,
        value: user,
        queryParser,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }
}
