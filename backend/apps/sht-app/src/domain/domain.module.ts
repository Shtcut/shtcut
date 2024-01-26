import { Module } from '@nestjs/common';
import { DomainController } from './controller/domain.controller';
import { DomainService } from './service/domain.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Workspace,
  Domain,
  DomainSchema,
  Hit,
  HitSchema,
  Link,
  LinkSchema,
  QrCode,
  QrCodeSchema,
  User,
  UserSchema,
  WorkspaceSchema,
} from 'shtcut/core';
import { HitModule } from '../hit';

@Module({
  imports: [
    HitModule,
    MongooseModule.forFeature([
      { name: Link.name, schema: LinkSchema },
      { name: Domain.name, schema: DomainSchema },
      { name: Hit.name, schema: HitSchema },
      { name: QrCode.name, schema: QrCodeSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [DomainController],
  providers: [DomainService],
  exports: [DomainService],
})
export class LinkModule {}
