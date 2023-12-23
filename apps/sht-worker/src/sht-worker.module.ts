import { configuration } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { CoreModule } from 'shtcut/core';
import { MessageModule } from './message';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ShtcutWorkerController } from './sht-worker.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['_env/worker/.env.local', '_env/.env'],
      load: [configuration],
    }),
    TerminusModule,
    CoreModule,
    MessageModule,
    SchedulerModule,
  ],
  controllers: [ShtcutWorkerController],
  providers: [],
})
export class ShtcutWorkerModule {}
