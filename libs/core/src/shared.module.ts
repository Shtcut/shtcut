import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { Queues } from 'shtcut/core';

const queues = [
  BullModule.forRootAsync({
    useFactory: (config: ConfigService) => {
      return {
        connection: {
          host: config.get('app.redis.host'),
          port: config.get('app.redis.port'),
          password: config.get('app.redis.password'),
        },
      };
    },
    inject: [ConfigService],
  }),
  BullModule.registerQueue({
    name: Queues.API,
  }),
  BullModule.registerQueue({
    name: Queues.SHTCUT_TASK,
  }),
];

@Module({
  imports: [...queues],
  providers: [],
  exports: [...queues],
})
export class SharedModule {}
