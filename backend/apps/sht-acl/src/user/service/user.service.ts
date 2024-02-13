import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Dict,
  MongoBaseService,
  QueryParser,
  Subscription,
  SubscriptionDocument,
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
    @InjectModel(Subscription.name) protected subscriptionModel: Model<SubscriptionDocument>,
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

  public async findObject(id: unknown, query?: Dict | QueryParser) {
    try {
      const condition = {
        user: Utils.toObjectId(id),
        active: true,
      };
      const [user, workspace, subscription] = await Promise.all([
        await super.findObject(id, query),
        await this.workspaceModel.find({
          ...Utils.conditionWithDelete({ ...condition }),
        }),
        await this.subscriptionModel.find({
          ...Utils.conditionWithDelete({ ...condition, status: 'active' }),
        }),
      ]);
      return { ...user?.toJSON(), workspace, subscription };
    } catch (e) {
      throw e;
    }
  }
}
