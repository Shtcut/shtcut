import { Body, Controller, Get, HttpCode, Next, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AppController, CreateLinkDto, JwtAuthGuard, NOT_FOUND, OK, UpdateLinkDto } from 'shtcut/core';
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

  @Get('/:backHalf')
  @HttpCode(OK)
  public async visit(
    @Param('backHalf') backHalf: string,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const userAgent = req.headers['user-agent'];
      const testMode = this.config.get('app.environment');
      const remoteAddress = req.socket.remoteAddress;
      const ipRaw: any = testMode
        ? '102.216.201.40'
        : remoteAddress?.includes('127.0.0.1') || remoteAddress?.includes('::')
          ? req.headers['x-forwarded-for'] || req.headers['x-real-ip']
          : remoteAddress;
      const ip = ipRaw?.includes(':') ? ipRaw?.split(':')[3] : ipRaw;
      const link = await this.service.processVisit({ remoteAddress: ip, userAgent, backHalf });
      if (link) {
        const response = await this.service.getResponse({
          code: OK,
          value: link,
        });
        return res.status(OK).json(response);
      }
      return res.status(NOT_FOUND).send('URL not found');
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
