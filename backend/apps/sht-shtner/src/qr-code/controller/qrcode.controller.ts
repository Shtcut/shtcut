import {
  Body,
  Controller,
  Get,
  HttpCode,
  Next,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  Delete,
} from '@nestjs/common';
import {
  AppController,
  CreateLinkDto,
  JwtAuthGuard,
  NOT_FOUND,
  OK,
  UpdateLinkDto,
  QrCodeDeleteDto,
  CreateQrCodeDto,
  WorkspaceGuard,
} from 'shtcut/core';
import { QrCodeService } from '../service/qrcode.service';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { Pagination } from 'shtcut/core';

@Controller('qrcodes')
@UseGuards(JwtAuthGuard, WorkspaceGuard)
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


  @Get('/')
  async find(@Req() req: Request, @Res() res: Response, @Next() next) {
    // The workspace ID is automatically attached by WorkspaceGuard and used by MongoBaseService
    return super.find(req, res, next);
  }

}
