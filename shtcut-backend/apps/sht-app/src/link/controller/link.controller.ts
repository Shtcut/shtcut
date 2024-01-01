import { Body, Controller, HttpCode, Next, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AppController, CreateLinkDto, JwtAuthGuard, OK, UpdateLinkDto } from 'shtcut/core';
import { LinkService } from '../service/link.service';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Controller('links')
export class LinkController extends AppController {
  constructor(
    protected service: LinkService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @Post('/visit')
  @HttpCode(OK)
  public async visit(
    @Body() payload: CreateLinkDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
    } catch (e) {
      return next(e);
    }
  }

  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: CreateLinkDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.create(payload, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @HttpCode(OK)
  public async update(
    @Param('id') id: string,
    @Body() payload: UpdateLinkDto,
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
    @Body() payload: UpdateLinkDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.patch(id, payload, req, res, next);
  }
}
