import { configuration } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { App, AppSchema, CoreModule } from 'shtcut/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth';

@Module({
  imports: [
    CoreModule,
    TerminusModule,
    AuthModule,
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['_env/app/.env.local', '_env/.env'],
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
