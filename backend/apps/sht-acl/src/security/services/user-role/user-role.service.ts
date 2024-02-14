import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBaseService, UserRole, UserRoleDocument } from 'shtcut/core';

@Injectable()
export class UserRoleService extends MongoBaseService {
  constructor(@InjectModel(UserRole.name) protected model: Model<UserRoleDocument>) {
    super(model);
  }
}
