import { Module } from '@nestjs/common';
import { WorkspaceController } from './controller/workspace.controller';
import { WorkspaceService } from './service/workspace.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Workspace,
  Domain,
  DomainSchema,
  WorkspaceSchema,
  RedisService,
  Subscription,
  SubscriptionSchema,
  Plan,
  PlanSchema,
} from 'shtcut/core';
import { SubscriptionModule } from '../subscription';

@Module({
  imports: [
    SubscriptionModule,
    MongooseModule.forFeature([
      { name: Domain.name, schema: DomainSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: Plan.name, schema: PlanSchema },
    ]),
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, RedisService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
