import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-app/lang';
import { Model } from 'mongoose';
import {
  AppException,
  CreateWorkspaceDto,
  Dict,
  MongoBaseService,
  Plan,
  PlanDocument,
  RedisService,
  Subscription,
  SubscriptionDocument,
  Utils,
  Workspace,
  WorkspaceDocument,
} from 'shtcut/core';
import * as _ from 'lodash';
import { ClientSession } from 'mongodb';

@Injectable()
export class WorkspaceService extends MongoBaseService {
  constructor(
    @InjectModel(Workspace.name) protected model: Model<WorkspaceDocument>,
    @InjectModel(Subscription.name) protected subscriptionModel: Model<SubscriptionDocument>,
    @InjectModel(Plan.name) protected planModel: Model<PlanDocument>,
    protected redisService: RedisService,
  ) {
    super(model, redisService);
  }

  /**
   * The function validates if a workspace with the given name already exists and throws an exception
   * if it does.
   * @param {CreateWorkspaceDto} obj - The parameter `obj` is of type `CreateWorkspaceDto`.
   * @returns In the given code, if the `workspace` object is found in the database, an exception is
   * thrown with a message indicating a conflict. If the `workspace` object is not found, `null` is
   * returned.
   */
  public async validateCreate(obj: CreateWorkspaceDto) {
    try {
      const { name } = obj;
      const slug = Utils.slugifyText(name);
      const workspace = await this.model.findOne({ ...Utils.conditionWithDelete({ slug }) });
      if (workspace) {
        throw AppException.CONFLICT(lang.get('workspace').duplicate);
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  public async createNewObject(obj: CreateWorkspaceDto & Dict, session?: ClientSession) {
    let newSession: ClientSession | undefined;

    try {
      newSession = session || (await this.model.startSession());

      newSession.startTransaction();

      if (!obj.plan) {
        const plan = await this.planModel.findOne({ name: 'Free' });
        obj.plan = plan._id;
      }

      const workspace = await super.createNewObject(obj);

      const subscription = await new this.subscriptionModel({
        plan: obj.plan,
        user: obj.user,
        workspace: workspace._id,
        startDate: Date.now(),
      }).save({ session: newSession });

      workspace.subscription = subscription._id;

      await workspace.save({ newSession });

      await newSession?.commitTransaction();

      return workspace;
    } catch (e) {
      await newSession?.abortTransaction();
      throw e;
    } finally {
      await newSession?.endSession();
    }
  }
}
