import { Module } from '@nestjs/common';
import { WorkspaceController } from './controller/workspace.controller';
import { WorkspaceService } from './service/workspace.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspace, Domain, DomainSchema, WorkspaceSchema } from 'shtcut/core';
import { HitModule } from '../hit';

@Module({
  imports: [
    HitModule,
    MongooseModule.forFeature([
      { name: Domain.name, schema: DomainSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
