import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestIpMiddleware } from 'shtcut/core';

@Module({
  providers: [
    {
      provide: RequestIpMiddleware,
      useClass: RequestIpMiddleware,
    },
  ],
  exports: [],
})
export class RequestIpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIpMiddleware).forRoutes('/api/v1/links/visit');
  }
}
