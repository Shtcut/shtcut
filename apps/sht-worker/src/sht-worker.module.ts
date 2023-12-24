import { configuration } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { CoreModule } from 'shtcut/core';
import { MessageModule } from './message';
import { SchedulerModule } from './scheduler';
import { ShtcutWorkerController } from './sht-worker.controller';
import { MediaModule } from './media';

@Module({
  imports: [
    MediaModule,
    TerminusModule,
    CoreModule,
    MessageModule,
    SchedulerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['_env/worker/.env.local', '_env/.env'],
      load: [configuration],
    }),
  ],
  controllers: [ShtcutWorkerController],
  providers: [],
})
export class ShtcutWorkerModule {}
