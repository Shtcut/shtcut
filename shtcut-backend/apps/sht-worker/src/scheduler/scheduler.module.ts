import { Module } from '@nestjs/common';
import { SharedModule } from 'shtcut/core';
import { MessageModule } from '../message';
import { HttpModule } from '@nestjs/axios';
import { ApiProcessor } from './jobs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [SharedModule, MessageModule, HttpModule],
  controllers: [],
  providers: [ApiProcessor, EventEmitter2],
  exports: [ApiProcessor],
})
export class SchedulerModule {}
