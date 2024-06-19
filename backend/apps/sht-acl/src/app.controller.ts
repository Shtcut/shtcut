import { Controller, Get, Req, Res } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { OK } from 'shtcut/core';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private service: AppService,
    private mongoService: MongooseHealthIndicator,
    private memory: MemoryHealthIndicator,
    @InjectConnection()
    private readonly connection: Connection,
    private config: ConfigService,
  ) {}

  @Get('/ping')
  @HealthCheck()
  public checkService() {
    return this.health.check([
      () =>
        Promise.resolve<HealthIndicatorResult>({
          api: {
            app: `${this.config.get('app.serviceName')}`,
            status: 'up',
            environment: this.config.get('app.environment'),
          },
        }),
      () =>
        this.mongoService.pingCheck('mongoDB', {
          connection: this.connection,
        }),
      () => this.memory.checkRSS('mem_rss', 1024 * 2 ** 20),
    ]);
  }

  @Get('/apps')
  async apps(@Req() req: Request, @Res() res: Response) {
    const apps = await this.service.getApps();
    const response = await this.service.getResponse({
      code: OK,
      value: apps,
    });
    return res.status(OK).json(response);
  }
}
