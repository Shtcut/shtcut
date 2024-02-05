import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Dict,
  MongoBaseService,
  QueryParser,
  User,
  UserDocument,
  Utils,
  Workspace,
  WorkspaceDocument,
} from 'shtcut/core';

@Injectable()
export class UserService extends MongoBaseService {
  constructor(
    @InjectModel(User.name) protected model: Model<UserDocument>,
    @InjectModel(Workspace.name) protected workspaceModel: Model<WorkspaceDocument>,
  ) {
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

  public async findObject(id: unknown, query?: Record<string, any> | QueryParser) {
    try {
      const user = await super.findObject(id, query);
      const workspace = await this.workspaceModel.find({
        ...Utils.conditionWithDelete({ user: user._id, active: true }),
      });
      return { ...user?.toJSON(), workspace };
    } catch (e) {
      throw e;
    }
  }
}
