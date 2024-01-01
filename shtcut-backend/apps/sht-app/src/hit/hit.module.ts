import { Module } from '@nestjs/common';
import { UserController } from './controller/hit.controller';
import { UserService } from './service/hit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema, User, UserSchema } from 'shtcut/core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
