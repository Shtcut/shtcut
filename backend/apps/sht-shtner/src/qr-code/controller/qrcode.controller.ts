import { Body, Controller, Get, HttpCode, Next, Param, Patch, Post, Put, Req, Res, UseGuards, Delete } from '@nestjs/common';
import { AppController, CreateLinkDto, JwtAuthGuard, NOT_FOUND, OK, UpdateLinkDto, QrCodeDeleteDto, CreateQrCodeDto } from 'shtcut/core';
import { QrCodeService } from '../service/qrcode.service';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Controller('qrcodes')
export class QrCodeController extends AppController {
  constructor(
    protected service: QrCodeService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @Get('/id:/scan')
  @HttpCode(OK)
  public async visit(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const qrCode = await this.service.visit(req, id);
      if (!qrCode) {
        const response = await this.getResponse({
          code: NOT_FOUND,
          value: this.lang.notFound,
        });
        return res.status(NOT_FOUND).json(response);
      }
      const response = await this.getResponse({
        code: OK,
        value: qrCode,
      });
      return res.status(OK).json(response);
    } catch (e) {
      return next(e);
    }
  }

  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: CreateQrCodeDto,
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

  @UseGuards(JwtAuthGuard)
  @Delete('/bulk')
  @HttpCode(OK)
  public async bulkDelete(
    @Body() payload: QrCodeDeleteDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.service.bulkDelete(payload.ids);
      return res.status(OK).json(await this.service.getResponse({
        code: OK,
        value: result,
      }));
    } catch (e) {
      return next(e);
    }
  }
}
