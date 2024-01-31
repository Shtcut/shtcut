import { Body, Controller, Get, HttpCode, Next, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppController, CreateDomainDto, JwtAuthGuard, OK } from 'shtcut/core';
import { DomainService } from '../service/domain.service';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';

@UseGuards(JwtAuthGuard)
@Controller('domains')
export class DomainController extends AppController {
  constructor(
    protected service: DomainService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @Get('/:id/verify')
  @HttpCode(OK)
  public async verifyDomain(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const domain = await this.service.verifyDomain(id);
      const response = await this.service.getResponse({
        code: OK,
        value: domain,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: CreateDomainDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.create(payload, req, res, next);
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
