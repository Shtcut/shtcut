import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema, Plan, PlanSchema, User, UserSchema } from 'shtcut/core';
import { PlanController, PlanService } from './index';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Plan.name, schema: PlanSchema },
    { name: Feature.name, schema: FeatureSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
