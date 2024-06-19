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
  User,
  UserSchema,
} from 'shtcut/core';
import { SubscriptionModule, SubscriptionService } from '../subscription';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Domain.name, schema: DomainSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, SubscriptionService, RedisService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
