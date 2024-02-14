import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, Role, RoleSchema, User, UserRole, UserSchema } from 'shtcut/core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: UserRole.name, schema: UserSchema },
      { name: Permission.name, schema: Permission },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class SecurityModule {}
