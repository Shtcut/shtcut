import { Controller, Get, Req, Res, Ip } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheck, HealthCheckService, HealthIndicatorResult } from '@nestjs/terminus';
import { Request, Response } from 'express';
import { GetClientInfo, OK } from 'shtcut/core';

@Controller('')
export class GatewayController {
  constructor(
    private health: HealthCheckService,
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
    ]);
  }

  @Get('/endpoint/ip')
  async IpAddress(@GetClientInfo() ipAddress, @Req() req: Request, @Res() res: Response) {
    console.log(ipAddress);
    return res.status(OK).json({ ipAddress });
  }
}
