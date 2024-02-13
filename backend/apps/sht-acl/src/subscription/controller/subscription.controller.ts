import { Controller, Get, HttpCode, Next, Param, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { AppController, JwtAuthGuard, OK } from 'shtcut/core';
import * as _ from 'lodash';
import { SubscriptionService } from '../service/subscription.service';
import { Request, Response, NextFunction } from 'express';

@ApiTags('Subscription')
@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionController extends AppController {
  constructor(
    protected service: SubscriptionService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @HttpCode(OK)
  public async find(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    _.extend(req.query, { user: req.user['_id'] });
    return super.find(req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(OK)
  public async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    _.extend(req.query, { user: req.user['_id'] });
    return super.findOne(id, req, res, next);
  }
}
