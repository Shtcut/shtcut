import { Body, Delete, Get, HttpCode, Next, Param, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Dict, JwtAuthGuard, OK } from 'shtcut/core';
import { NextFunction, Request, Response } from 'express';

export abstract class AppController extends BaseController {
  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(OK)
  public async create(
    @Body() payload: Record<string, any>,
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
    return super.find(req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(OK)
  public async findOne(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return super.findOne(id, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @HttpCode(OK)
  public async update(
    @Param('id') id: string,
    @Body() payload: Dict,
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
    @Body() payload: Dict,
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    return super.patch(id, payload, req, res, next);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(OK)
  public async remove(@Param('id') id: string, @Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    return super.remove(id, req, res, next);
  }

  @Delete('/delete/many')
  @HttpCode(OK)
  public async deleteMany(@Req() req, @Res() res, @Next() next: NextFunction) {
    return super.deleteMany(req, res, next);
  }

  protected async getResponse(data: { code: number; value: any; message?: string }) {
    return this.service.getResponse(data);
  }
}
