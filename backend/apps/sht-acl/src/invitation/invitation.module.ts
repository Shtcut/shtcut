import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema, Invitation, InvitationSchema, Plan, PlanSchema, User, UserSchema } from 'shtcut/core';
import { InvitationController, InvitationService } from './index';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Invitation.name, schema: InvitationSchema },
  ])],
  controllers: [InvitationController],
  providers: [InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}
