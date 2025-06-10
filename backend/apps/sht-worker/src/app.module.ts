import { configuration } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { Auth, AuthSchema, CoreModule, JwtStrategy } from 'shtcut/core';
import { MessageModule } from './message';
import { SchedulerModule } from './scheduler';
import { AppController } from './app.controller';
import { MediaModule } from './media';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['_env/worker/.env.local', '_env/.env'],
      load: [configuration],
    }),
    MediaModule,
    TerminusModule,
    CoreModule,
    MessageModule,
    SchedulerModule,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [AppController],
  providers: [JwtStrategy],
})
export class AppModule {}
