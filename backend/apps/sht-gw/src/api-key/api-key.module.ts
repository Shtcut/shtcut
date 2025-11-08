import { Module } from '@nestjs/common';
import { ApiKeyController } from './controller/api-key.controller';
import { ApiKeyService } from './service/api-key.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hit, HitSchema, IpService } from 'shtcut/core';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hit.name, schema: HitSchema }]), HttpModule],
  controllers: [ApiKeyController],
  providers: [ApiKeyService, IpService],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
