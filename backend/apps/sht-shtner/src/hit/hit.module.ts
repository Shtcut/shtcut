import { Module } from '@nestjs/common';
import { HitController } from './controller/hit.controller';
import { HitService } from './service/hit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hit, HitSchema, IpService } from 'shtcut/core';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hit.name, schema: HitSchema }]), HttpModule],
  controllers: [HitController],
  providers: [HitService, IpService],
  exports: [HitService],
})
export class HitModule {}
