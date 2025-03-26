import { Module, OnModuleInit } from '@nestjs/common';
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
import mongoose from 'mongoose';

@Module({
  imports: [
    InvitationModule,
    AuthModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Domain.name, schema: DomainSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: 'workspace', schema: WorkspaceSchema },
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
export class WorkspaceModule implements OnModuleInit {
  onModuleInit() {
    // Ensure both models are registered early
    if (!mongoose.models['workspace']) {
      mongoose.model('workspace', WorkspaceSchema);
    }
    if (!mongoose.models['Workspace']) {
      mongoose.model('Workspace', WorkspaceSchema);
    }
  }
}
