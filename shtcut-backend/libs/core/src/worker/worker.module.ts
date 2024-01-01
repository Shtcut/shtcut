import { Module } from '@nestjs/common';
import { WorkService } from '../services';
import { SharedModule } from '../shared.module';

@Module({
  imports: [SharedModule],
  providers: [WorkService],
  exports: [WorkService],
})
export class WorkerModule {}
