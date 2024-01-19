import { Body, Controller, HttpCode, Next, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { AppController, CreatePlanDto, JwtAuthGuard, OK, UpdatePlanDto } from 'shtcut/core';
import * as _ from 'lodash';
import { PlanService } from '../service/plan.service';
import { Request, Response, NextFunction } from 'express';

@ApiTags('Plan')
@Controller('admin/plans')
@UseGuards(JwtAuthGuard)
export class PlanController extends AppController {
  constructor(
    protected service: PlanService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: CreatePlanDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    super.create(payload, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @HttpCode(OK)
  public async update(
    @Param('id') id: string,
    @Body() payload: Record<string, any>,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.update(id, payload, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @HttpCode(OK)
  public async patch(
    @Param('id') id: string,
    @Body() payload: Record<string, any>,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.patch(id, payload, req, res, next);
  }
}
