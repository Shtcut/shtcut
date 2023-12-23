import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { InjectConnection } from '@nestjs/mongoose';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { Connection } from 'mongoose';

@Controller()
export class ShtcutWorkerController {
  constructor(
    private health: HealthCheckService,
    private service: MicroserviceHealthIndicator,
    private mongoService: MongooseHealthIndicator,
    @InjectConnection()
    private readonly connection: Connection,
    private config: ConfigService,
  ) {}

  @Get('/ping')
  @HealthCheck()
  async checkService() {
    const redis = new URL(this.config.get('app.redis.url'));
    const pingCheck = await this.health.check([
      () =>
        Promise.resolve<HealthIndicatorResult>({
          worker: {
            app: `${this.config.get('app.appName')}-worker`,
            status: 'up',
            environment: this.config.get('app.environment'),
          },
        }),
      () => this.mongoService.pingCheck('mongoDB', { connection: this.connection }),
      () =>
        this.service.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            host: redis.hostname,
            username: redis.username,
            password: redis.password,
            port: Number(redis.port),
          },
        }),
    ]);
    return pingCheck;
  }
}
