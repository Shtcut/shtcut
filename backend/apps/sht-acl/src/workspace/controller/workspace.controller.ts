import { Body, Controller, Get, HttpCode, Next, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AppController, CreateWorkspaceDto, JwtAuthGuard, OK, UpdateWorkspaceDto } from 'shtcut/core';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { WorkspaceService } from '../service/workspace.service';
import * as _ from 'lodash';

@UseGuards(JwtAuthGuard)
@Controller('workspaces')
export class WorkspaceController extends AppController {
  constructor(
    protected service: WorkspaceService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: CreateWorkspaceDto,
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

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @HttpCode(OK)
  public async update(
    @Param('id') id: string,
    @Body() payload: UpdateWorkspaceDto,
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
    @Body() payload: UpdateWorkspaceDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.patch(id, payload, req, res, next);
  }
}
