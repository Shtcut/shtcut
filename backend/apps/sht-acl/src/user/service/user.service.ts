import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-acl/lang';
import { ClientSession, Model } from 'mongoose';
import {
  AppException,
  Dict,
  MongoBaseService,
  QueryParser,
  Role,
  RoleDocument,
  Roles,
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
    @InjectModel(Role.name) protected roleModel: Model<RoleDocument>,
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

  public async createNewObject(obj: Dict, session?: ClientSession) {
    try {
      const user = await this.model.findOneAndUpdate(
        { email: obj.email },
        {
          $setOnInsert: {
            _id: obj._id,
            publicId: Utils.generateUniqueId('usr'),
          },
          ...obj,
        },
        {
          ...Utils.mongoUpdateDefaultProps({ session }),
        },
      );
      await this.assignOwnerRole(user, obj.module, Roles.OWNER, session);
      return user;
    } catch (e) {
      throw e;
    }
  }

  public async assignOwnerRole(user: User, module: string, title: string, session: ClientSession) {
    try {
      const ownerRole = await this.roleModel.findOne({
        title,
        isDefault: true,
      });
      if (!ownerRole) {
        throw AppException.INTERNAL_SERVER(lang.get('role').notFound);
      }
      return this.model.findOneAndUpdate(
        {
          role: ownerRole._id,
        },
        {},
        { ...Utils.mongoUpdateDefaultProps() },
      );
    } catch (e) {
      await session?.abortTransaction();
      throw e;
    } finally {
      await session?.endSession();
    }
  }
}
