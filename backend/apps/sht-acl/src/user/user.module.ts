import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Auth,
  AuthSchema,
  Media,
  MediaSchema,
  Role,
  RoleSchema,
  Subscription,
  SubscriptionSchema,
  User,
  UserSchema,
  Workspace,
  WorkspaceSchema,
} from 'shtcut/core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Media.name, schema: MediaSchema },
      { name: Workspace.name, schema: WorkspaceSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
