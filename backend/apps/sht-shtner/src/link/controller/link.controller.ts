import { Body, Controller, Get, HttpCode, Next, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import {
  AppController,
  CreateLinkDto,
  GetClientInfo,
  JwtAuthGuard,
  NOT_FOUND,
  OK,
  QueryParser,
  UpdateLinkDto,
} from 'shtcut/core';
import { LinkService } from '../service/link.service';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import {RateLimiterGuard} from "shtcut/core/shared/guards/rate-limiter.guard";

@Controller('links')
export class LinkController extends AppController {
  constructor(
    protected service: LinkService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @Get('/visit/:domain/:alias')
  @UseGuards(RateLimiterGuard)
  @HttpCode(OK)
  public async visit(
    @Param('domain') domain: string,
    @Param('alias') alias: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const link = await this.service.visit(req, domain, alias);
      let response = null;
      if (!link) {
        response = await this.service.getResponse({
          code: NOT_FOUND,
          value: this.lang.notFound,
        });
        return res.status(NOT_FOUND).json(response);
      }
      response = await this.service.getResponse({
        code: OK,
        value: link,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Get('/metadata')
  @HttpCode(OK)
  public async urlMetaData(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const queryParser = new QueryParser(Object.assign({}, req.query));
      const data = await this.service.urlMetadata(queryParser.query.url);
      const response = await this.service.getResponse({
        code: OK,
        value: data,
      });
      return res.status(OK).json(response);
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
