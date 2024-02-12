import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Auth, AuthSchema, User, UserSchema, WorkerModule } from 'shtcut/core';
import { AuthController } from './controller/auth.controller';
import { AuthService, SocialAuthService } from './service';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    HttpModule,
    WorkerModule,
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: User.name, schema: UserSchema },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('app.encryptionKey'),
          signOptions: { expiresIn: config.get('app.jwtExpiry') },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SocialAuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
