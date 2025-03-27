import { Body, Controller, Get, HttpCode, Next, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { AppController, CreateInvitationDto, JwtAuthGuard, OK, WorkspaceGuard } from 'shtcut/core';
import { InvitationService } from '../service/invitation.service';
import { NextFunction, Request, Response } from 'express';

@ApiTags('Invitations')
@Controller('invitations')
@UseGuards(JwtAuthGuard)
export class InvitationController extends AppController {
  constructor(
    protected service: InvitationService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: CreateInvitationDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    await super.create(payload, req, res, next);
  }
}
