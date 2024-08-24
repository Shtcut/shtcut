import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-acl/lang';
import * as _ from 'lodash';
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

  /**
   * The function creates a new object in a MongoDB collection, updates the object if it already
   * exists, and assigns an owner role to the user associated with the object.
   * @param {Dict} obj - The `obj` parameter is a dictionary object that contains the data for creating
   * a new object. It should have properties such as `email`, `_id`, and other properties
   * specific to the object being created.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It is used to specify a session for the MongoDB transaction. If a session is
   * provided, the function will use that session for the database operations. If no session is
   * provided, the function will use the default session.
   * @returns The `createNewObject` function returns the `user` object.
   */
  public async createNewObject(obj: Dict, session?: ClientSession) {
    try {
      const user = await this.model.findOneAndUpdate(
        { email: obj.email },
        {
          $setOnInsert: {
            _id: obj._id,
            publicId: Utils.generateUniqueId(this.defaultConfig.idToken),
          },
          ..._.omit(obj, ['_id']),
        },
        {
          ...Utils.mongoDefaultUpdateProps({ session }),
        },
      );
      await this.assignOwnerRole(user, Roles.OWNER, session);
      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   * The function assigns an owner role to a user with a specific title and generates a unique public
   * ID for the user.
   * @param {User} user - The `user` parameter is an object representing a user. It likely contains
   * properties such as `_id` (user ID), `name`, `email`, etc.
   * @param {string} title - The `title` parameter is a string that represents the title of the role
   * that needs to be assigned to the user.
   * @param {ClientSession} session - The `session` parameter is of type `ClientSession` and is used to
   * perform a transaction in MongoDB. It allows multiple operations to be grouped together and ensures
   * that either all the operations are successfully applied or none of them are.
   * @returns the result of the `findOneAndUpdate` method call on the `this.model` object.
   */
  public async assignOwnerRole(user: User, title: string, session: ClientSession) {
    try {
      const role = await this.roleModel.findOne({
        title,
        isDefault: true,
      });
      if (!role) {
        throw AppException.INTERNAL_SERVER(lang.get('role').notFound);
      }
      return this.model.findOneAndUpdate(
        {
          email: user.email,
        },
        {
          role: role._id,
          $setOnInsert: {
            publicId: Utils.generateUniqueId(this.defaultConfig.idToken),
          },
        },
        { ...Utils.mongoDefaultUpdateProps({ session }) },
      );
    } catch (e) {
      throw e;
    }
  }

  public async findObject(id: unknown, query?: Dict | QueryParser) {
    try {
      const condition = {
        user: Utils.toObjectId(id),
        active: true,
      };
      const [user, workspace] = await Promise.all([
        await super.findObject(id, query),
        await this.workspaceModel
          .find({
            ...Utils.conditionWithDelete({ ...condition }),
          })
          .populate([{ path: 'subscriptions', select: ['module', 'plan', 'status'] }]),
      ]);
      return { ...user?.toJSON(), workspace };
    } catch (e) {
      throw e;
    }
  }
}
