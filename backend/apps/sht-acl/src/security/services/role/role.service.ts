import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBaseService, Role, RoleDocument } from 'shtcut/core';

@Injectable()
export class RoleService extends MongoBaseService {
  constructor(@InjectModel(Role.name) protected model: Model<RoleDocument>) {
    super(model);
    this.routes = {
      create: false,
      find: false,
      findOne: false,
      update: false,
      patch: false,
      remove: false,
    };
  }
}
