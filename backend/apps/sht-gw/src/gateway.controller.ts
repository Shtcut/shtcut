import { Controller, Get, Req, Res, Ip } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheck, HealthCheckService, HealthIndicatorResult } from '@nestjs/terminus';
import { Request, Response } from 'express';
import { GetClientInfo, OK } from 'shtcut/core';
import { resolveTxt as resolveTxtSync } from 'dns';
import { promisify } from 'util';

const resolveTxt = promisify(resolveTxtSync);
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

  @Get('/verify/dns')
  async resolveDNS(@Req() req: Request, @Res() res: Response) {
    const txtRecordLists = await resolveTxt('visaintel.com');
    return res.status(OK).json({ txtRecordLists });
  }
}
