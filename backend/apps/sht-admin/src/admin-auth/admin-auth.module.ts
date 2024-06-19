import { JwtAdminStrategy } from './strategies/jwt-auth.strategy';
import { AdminAuthController } from './controller/admin-auth.controller';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { AdminAuth, AdminAuthSchema } from 'shtcut/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminAuthService } from './service/admin-auth.service';
import { AdminLocalStrategy } from './strategies/local.strategy';

@Global()
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: AdminAuth.name, schema: AdminAuthSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          defaultStrategy: 'jwt',
          secret: config.get<string>('app.encryptionKey'),
          signOptions: { expiresIn: '30d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AdminLocalStrategy, JwtAdminStrategy],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}
