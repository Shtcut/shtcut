import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AppException,
  Auth,
  CreateInvitationDto,
  CreateWorkspaceDto,
  Dict,
  MongoBaseService,
  Plan,
  PlanDocument,
  RedisService,
  Subscription,
  SubscriptionDocument,
  UpdateWorkspaceDto,
  User,
  UserDocument,
  Utils,
  Workspace,
  WorkspaceDocument,
} from 'shtcut/core';
import * as _ from 'lodash';
import { ClientSession } from 'mongodb';
import { SubscriptionService } from '../../subscription';
import { InvitationService } from '../../invitation';
import lang from 'apps/sht-acl/lang';

@Injectable()
export class WorkspaceService extends MongoBaseService {
  constructor(
    @InjectModel(Workspace.name) protected model: Model<WorkspaceDocument>,
    @InjectModel(Subscription.name) protected subscriptionModel: Model<SubscriptionDocument>,
    @InjectModel(Plan.name) protected planModel: Model<PlanDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
    protected subscriptionService: SubscriptionService,
    protected invitationService: InvitationService,
    protected redisService: RedisService,
  ) {
    super(model);
  }

  /**
   * The function validates if a workspace with the given name already exists and throws an exception
   * if it does.
   * @param {CreateWorkspaceDto} obj - The parameter `obj` is of type `CreateWorkspaceDto`.
   * @returns In the given code, if the `workspace` object is found in the database, an exception is
   * thrown with a message indicating a conflict. If the `workspace` object is not found, `null` is
   * returned.
   */
  public async validateCreate(obj: CreateWorkspaceDto & Dict) {
    try {
      const { name, user } = obj;
      const slug = Utils.slugifyText(name);
      const workspace = await this.model.findOne({ ...Utils.conditionWithDelete({ slug, user }) });
      if (workspace) {
        throw AppException.CONFLICT(lang.get('workspace').duplicate);
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  /**
   * The function creates a new object, starts a session, and performs various operations related to
   * creating a workspace.
   * @param obj - The `obj` parameter is an object that contains the data for creating a new workspace.
   * It is of type `CreateWorkspaceDto & Dict`, which means it is a combination of the
   * `CreateWorkspaceDto` type and a dictionary type (`Dict`).
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It is used to specify a MongoDB session for the transaction. If a session is not
   * provided, a new session is started using `this.model.startSession()`.
   * @returns the `workspace` object.
   */
  public async createNewObject(obj: CreateWorkspaceDto & Dict, session?: ClientSession) {
    try {
      session = session ?? (await this.model.startSession());

      session.startTransaction();

      const { plan, modules } = obj;

      if (!plan) {
        const plan = await this.planModel.findOne({ name: 'Free' });
        obj.plan = plan._id as string;
      }

      obj.slug = obj.slug ?? Utils.slugifyText(obj.name);

      const workspace = await super.createNewObject(obj, session);

      if (obj.memberEmails && obj.memberEmails.length) {
        const invitationPayload: CreateInvitationDto = {
          emails: obj.memberEmails,
          redirectLink: obj.redirectUrl,
          workspace: String(workspace._id),
        };
        await this.invitationService.createNewObject(invitationPayload, session);
      }

      const [subscription, _] = await Promise.all([
        this.createSubscription(workspace, obj, session),
        this.updateUser({ workspace, modules }, session),
      ]);

      workspace.subscriptions = [subscription._id];
      workspace.modules = modules;
      workspace.members = obj.memberEmails ?? [];

      await workspace.save({ session });

      await session?.commitTransaction();

      return workspace;
    } catch (e) {
      await session?.abortTransaction();
      throw e;
    } finally {
      await session?.endSession();
    }
  }

  /**
   * The function updates a workspace object and creates a subscription if the module specified in the
   * update is not already included in the workspace's modules.
   * @param {string} id - The `id` parameter is a string that represents the identifier of the object
   * to be updated.
   * @param {UpdateWorkspaceDto} obj - The `obj` parameter is of type `UpdateWorkspaceDto`, which is an
   * object containing the updated properties of a workspace.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It is used to specify a session for the MongoDB transaction. If a session is
   * provided, the function will perform the update operation within that session. If no session is
   * provided, the update operation will be performed outside of any session
   * @returns The `workspace` object is being returned.
   */
  public async updateObject(id: string, obj: UpdateWorkspaceDto, session?: ClientSession) {
    const workspace = await super.updateObject(id, obj);
    const { module } = obj;
    if (!workspace.modules.includes(module)) {
      const subscription = await this.createSubscription(workspace, obj, session);

      workspace.subscriptions =
        workspace.subscriptions && workspace.subscriptions.length
          ? [...workspace.subscriptions, subscription._id]
          : [subscription._id];

      workspace.modules = workspace.modules && workspace.modules.length ? [...workspace.modules, module] : [module];
      const [updatedWorkspace, _] = await Promise.all([
        await workspace.save(),
        await this.updateUser({ workspace, module }, session),
      ]);
      return updatedWorkspace;
    }
    return workspace;
  }

  /**
   * The function creates a new subscription object with the provided workspace, object, and session.
   * @param workspace - The `workspace` parameter represents the workspace object that the subscription
   * will be created for.
   * @param obj - The `obj` parameter is an object that contains the data for creating a subscription.
   * It likely includes properties such as `name`, `price`, `duration`, etc.
   * @param session - The "session" parameter is likely referring to a database session or transaction
   * object. It is used to ensure that the database operations performed within the
   * "createSubscription" function are atomic and can be rolled back if necessary.
   * @returns the result of calling the `createNewObject` method of the `subscriptionService` object
   * with the `payload` and `session` parameters.
   */
  public async createSubscription(workspace, obj, session) {
    const payload = {
      ...obj,
      user: workspace.user,
      plan: workspace.plan || obj.plan,
      workspace: workspace._id,
      startDate: Date.now(),
    };
    return this.subscriptionService.createNewObject(payload, session);
  }

  /**
   * The function `updateUser` in TypeScript updates a user's modules and workspaces based on the
   * provided object.
   * @param obj - The `obj` parameter in the `updateUser` function seems to contain `workspace` and
   * `module` properties. These properties are then used to update the user's modules and workspaces in
   * the database.
   * @param [session] - The `session` parameter in the `updateUser` function is an optional parameter
   * that allows you to pass a session object to the `user.save()` method. Sessions are used in
   * database operations to group multiple operations into a single transaction or unit of work. By
   * passing a session object to the `user
   */
  public async updateUser(obj, session?) {
    try {
      const { workspace, modules } = obj;
      const user = await this.userModel.findById(workspace.user);
      if (user) {
        let workspaceModules: any = [
          {
            workspaceName: workspace.name,
            modules,
          },
        ];
        if (user.modules.length > 0) {
          const userModule = user.modules.find(
            (m) => m.workspaceName.includes(workspace.name) && m.workspaceName.includes(module),
          );
          workspaceModules = userModule
            ? [
                {
                  workspaceName: workspace.name,
                  modules: [...new Set([...userModule.modules, module])],
                },
              ]
            : workspaceModules;
          user.modules = [...user.modules, ...workspaceModules];
        } else {
          user.modules = [...user.modules, ...workspaceModules];
        }
        user.workspaces.addToSet(workspace._id);
      }
      user.save({ session });
    } catch (e) {
      throw e;
    }
  }
}
