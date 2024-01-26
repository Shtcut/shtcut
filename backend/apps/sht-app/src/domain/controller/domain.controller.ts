import { Body, Controller, HttpCode, Next, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AppController, CreateLinkDto, JwtAuthGuard, OK, UpdateLinkDto, VerifyDomainDto } from 'shtcut/core';
import { DomainService } from '../service/domain.service';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Controller('domains')
export class DomainController extends AppController {
  constructor(
    protected service: DomainService,
    protected config: ConfigService,
  ) {
    super(config, service);
  }

  @Post('/verify')
  @HttpCode(OK)
  public async verifyDomain(
    @Body() payload: VerifyDomainDto,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const link = await this.service.processVisit(payload);
      const response = await this.service.getResponse({
        code: OK,
        value: null,
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
