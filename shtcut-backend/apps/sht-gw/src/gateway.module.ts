import { configuration } from '@config';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppModule } from './app';
import { AppEndpoints, WorkerEndpoints } from './rest';
import { GatewayController } from './gateway.controller';
import { CoreModule, AppProxyMiddleware, WorkerProxyMiddleware, ApiMiddleware } from './_core';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['_env/gateway/.env.local', '_env/.env'],
      load: [configuration],
    }),
    TerminusModule,
    AppModule,
    CoreModule,
  ],
  providers: [],
  controllers: [GatewayController],
  exports: [],
})
export class GatewayModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ApiMiddleware)
      .forRoutes('*')
      .apply(AppProxyMiddleware)
      .forRoutes(...AppEndpoints)
      .apply(WorkerProxyMiddleware)
      .forRoutes(...WorkerEndpoints);
  }
}
