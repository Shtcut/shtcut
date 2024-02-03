import { Body, Controller, HttpCode, Next, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { BaseController, CreateFeatureDto, JwtAuthGuard, OK } from 'shtcut/core';
import * as _ from 'lodash';
import { FeatureService } from '../service/feature.service';
import { NextFunction, Request, Response } from 'express';

@ApiTags('Feature')
@Controller('admin/features')
@UseGuards(JwtAuthGuard)
export class FeatureController extends BaseController {
  constructor(
    protected service: FeatureService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: CreateFeatureDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.create(payload, req, res, next);
  }
}
