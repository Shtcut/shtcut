import {  Controller, Get, HttpCode, Next, Param, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { AppController, OK } from 'shtcut/core';
import { InvitationService } from '../service/invitation.service';
import { NextFunction, Request, Response } from 'express';

@ApiTags('Plan')
@Controller('plans')
export class InvitationController extends AppController {
  constructor(
    protected service: InvitationService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @Get('/')
  @HttpCode(OK)
  public async find(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return super.find(req, res, next);
  }

  @Get('/:id')
  @HttpCode(OK)
  public async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return super.findOne(id, req, res, next);
  }
}
