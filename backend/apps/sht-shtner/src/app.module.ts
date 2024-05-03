import { configuration } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { App, AppSchema, Auth, AuthSchema, CoreModule, RateLimiterModule } from 'shtcut/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../../sht-acl/src/user';
import { LinkModule } from './link';
import { DomainModule } from './domain';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './_shard';
import { QrCodeModule } from './qr-code';

@Module({
  imports: [
    CoreModule,
    TerminusModule,
    DomainModule,
    UserModule,
    LinkModule,
    QrCodeModule,
    PassportModule,
    PassportModule,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('app.encryptionKey'),
          signOptions: { expiresIn: config.get('app.jwtExpiry') },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['_env/shtner/.env.local', '_env/.env'],
      load: [configuration],
    }),
    RateLimiterModule.forRoot({
      framework: 'Express',
      keyPrefix: 'global',
      points: 10, // 10 requests,
      duration: 60, // per 1 minute by IP
      errorMessage: 'Too many requests, please try again',
      logger: true,
      redis: {
        host: configuration().app.redis.host,
        port: configuration().app.redis.port,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
