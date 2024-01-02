import { Module } from '@nestjs/common';
import { HitController } from './controller/hit.controller';
import { HitService } from './service/hit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hit, HitSchema } from 'shtcut/core';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hit.name, schema: HitSchema }])],
  controllers: [HitController],
  providers: [HitService],
  exports: [HitService],
})
export class HitModule {}
