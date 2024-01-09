import { Module } from '@nestjs/common';
import { LinkController } from './controller/link.controller';
import { LinkService } from './service/link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema, User, UserSchema } from 'shtcut/core';
import { HitModule } from '../hit';

@Module({
  imports: [
    HitModule,
    MongooseModule.forFeature([
      { name: Link.name, schema: LinkSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [LinkController],
  providers: [LinkService],
  exports: [LinkService],
})
export class LinkModule {}
