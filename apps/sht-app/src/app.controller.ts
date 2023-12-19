import { Controller, Get, Req, Res } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HealthIndicatorResult, MongooseHealthIndicator } from '@nestjs/terminus';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private service: AppService,
    private mongoService: MongooseHealthIndicator,
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
            app: `${this.config.get('serviceName')}`,
            status: 'up',
            environment: this.config.get('environment'),
          },
        }),
      () =>
        this.mongoService.pingCheck('mongoDB', {
          connection: this.connection,
        }),
    ]);
  }

  @Get('/apps')
  async apps(@Req() req: Request, @Res() res: Response) {
    // const apps = await this.service.ge
  }
}
