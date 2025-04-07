import { Body, Controller, HttpCode, Next, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { BaseController, CreateTagDto, JwtAuthGuard, OK, WorkspaceGuard } from 'shtcut/core';
import * as _ from 'lodash';
import { TagService } from '../service/tags.service';
import { NextFunction, Request, Response } from 'express';

@ApiTags('Tags')
@Controller('tags')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
export class TagController extends BaseController {
  constructor(
    protected service: TagService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: CreateTagDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.create(payload, req, res, next);
  }
}
