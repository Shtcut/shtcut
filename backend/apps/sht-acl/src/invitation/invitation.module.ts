import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema, WorkerModule, Workspace, WorkspaceSchema } from 'shtcut/core';
import { InvitationController, InvitationService } from './index';

@Module({
  imports: [
    WorkerModule,
    MongooseModule.forFeature([
      { name: Invitation.name, schema: InvitationSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {
}
