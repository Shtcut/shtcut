import { Module } from '@nestjs/common';
import { LinkBioController } from './controller/link-bio.controller';
import { LinkBioService } from './service/link-bio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkBio, LinkBioSchema, Workspace, WorkspaceSchema } from 'shtcut/core';
import { HitModule } from '../hit';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LinkBio.name, schema: LinkBioSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
    ]),
    HitModule,
  ],
  controllers: [LinkBioController],
  providers: [LinkBioService],
  exports: [LinkBioService],
})
export class LinkBioModule {}
