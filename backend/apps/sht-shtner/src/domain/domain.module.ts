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
  RedisService,
  VercelService,
} from 'shtcut/core';
import { HitModule } from '../hit';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
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
  providers: [DomainService, RedisService, VercelService],
  exports: [DomainService],
})
export class DomainModule {}
