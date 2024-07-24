import { configuration } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { App, AppSchema, CoreModule, Workspace } from 'shtcut/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth';
import { UserModule } from './user';
import { WorkspaceModule } from './workspace';
import { SubscriptionModule } from './subscription';
import { SecurityModule } from './security/security.module';
import { PlanModule } from './plan';


@Module({
  imports: [
    CoreModule,
    TerminusModule,
    AuthModule,
    UserModule,
    SubscriptionModule,
    SecurityModule,
    WorkspaceModule,
    PlanModule,
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['_env/acl/.env.local', '_env/.env'],
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
