import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheck, HealthCheckService, HealthIndicatorResult } from '@nestjs/terminus';

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
}
