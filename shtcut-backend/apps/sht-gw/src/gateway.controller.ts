import { Controller, Get, HttpCode, Next, Param, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheck, HealthCheckService, HealthIndicatorResult, MongooseHealthIndicator } from '@nestjs/terminus';
import { NextFunction, Request, Response } from 'express';
import { NOT_FOUND, OK } from 'shtcut/core';
import { GatewayService } from './gateway.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('')
export class GatewayController {
  constructor(
    private service: GatewayService,
    private health: HealthCheckService,
    private mongoService: MongooseHealthIndicator,
    @InjectConnection()
    private readonly connection: Connection,
    private config: ConfigService,
  ) {}

  @Get('/ping')
  @HealthCheck()
  checkService() {
    return this.health.check([
      () =>
        Promise.resolve<HealthIndicatorResult>({
          api: {
            app: `${this.config.get('serviceName')}`,
            status: 'up',
            environment: this.config.get('app.environment'),
          },
        }),
      () =>
        this.mongoService.pingCheck('mongoDB', {
          connection: this.connection,
        }),
    ]);
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
        return res.redirect(link.originalURL);
      }
      return res.status(NOT_FOUND).send('URL not found');
    } catch (e) {
      return next(e);
    }
  }
}
