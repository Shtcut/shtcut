import { configuration } from '@config';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppModule } from './app';
import { AppEndpoints, WorkerEndpoints } from './rest';
import { GatewayController } from './gateway.controller';
import { CoreModule, AppProxyMiddleware, WorkerProxyMiddleware, ApiMiddleware } from './_core';
import { GatewayService } from './gateway.service';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { Hit, HitSchema, Link, LinkSchema } from 'shtcut/core';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService): MongooseModuleFactoryOptions => {
        return {
          uri: config.get('app.mongodb.url'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Hit.name, schema: HitSchema },
      { name: Link.name, schema: LinkSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['_env/gateway/.env.local', '_env/.env'],
      load: [configuration],
    }),
    TerminusModule,
    AppModule,
    CoreModule,
  ],
  providers: [GatewayService],
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
