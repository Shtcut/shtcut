import { Module } from '@nestjs/common';
import { CoreModule } from 'shtcut/core';
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
  Invitation,
  InvitationSchema,
  WorkspaceMember,
  WorkspaceMemberSchema,
} from 'shtcut/core';
import { SubscriptionService } from '../subscription';
import { InvitationModule } from '../invitation';
import { AuthModule } from '../auth';
import { UserModule } from '../user';

@Module({
  imports: [
    InvitationModule,
    AuthModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Domain.name, schema: DomainSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: User.name, schema: UserSchema },
      { name: Invitation.name, schema: InvitationSchema },
      { name: WorkspaceMember.name, schema: WorkspaceMemberSchema },
    ]),
    CoreModule,
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, SubscriptionService, RedisService],
  exports: [WorkspaceService],
})
export class WorkspaceModule { }
