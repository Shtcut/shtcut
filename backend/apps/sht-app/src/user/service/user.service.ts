import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBaseService, User, UserDocument } from 'shtcut/core';

@Injectable()
export class UserService extends MongoBaseService {
  constructor(@InjectModel(User.name) protected model: Model<UserDocument>) {
    super(model);
    this.routes = {
      create: false,
      find: false,
      findOne: false,
      update: true,
      patch: false,
      remove: false,
    };
  }
}
