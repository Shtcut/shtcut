import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AppException,
  CreateInvitationDto,
  CreateWorkspaceDto,
  Dict,
  Invitation,
  InvitationDocument,
  MongoBaseService,
  Pagination,
  Plan,
  PlanDocument,
  QueryParser,
  RedisService,
  Subscription,
  SubscriptionDocument,
  UpdateWorkspaceDto,
  User,
  UserDocument,
  Utils,
  Workspace,
  WorkspaceDocument,
  WorkspaceMember,
  WorkspaceMemberDocument,
} from 'shtcut/core';
import * as _ from 'lodash';
import { ClientSession } from 'mongodb';
import { SubscriptionService } from '../../subscription';
import { InvitationService } from '../../invitation';
import lang from 'apps/sht-acl/lang';
import { UserService } from '../../user';
import { AuthService } from '../../auth';
import { Request } from 'express';

@Injectable()
export class WorkspaceService extends MongoBaseService {
  constructor(
    @InjectModel(Workspace.name) protected model: Model<WorkspaceDocument>,
    @InjectModel(Subscription.name) protected subscriptionModel: Model<SubscriptionDocument>,
    @InjectModel(Plan.name) protected planModel: Model<PlanDocument>,
    @InjectModel(Invitation.name) protected invitationModel: Model<InvitationDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
    @InjectModel(WorkspaceMember.name) protected memberModel: Model<WorkspaceMemberDocument>,
    protected subscriptionService: SubscriptionService,
    protected invitationService: InvitationService,
    protected authService: AuthService,
    protected userService: UserService,
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
    let localSession: ClientSession | undefined;
    try {
      // Only create a new session if one wasn't provided
      if (!session) {
        localSession = await this.model.startSession();
        localSession.startTransaction();
      }

      // Use the provided session or the local one
      const activeSession = session || localSession;

      const { plan, modules, memberEmails, redirectUrl } = obj;

      if (!plan) {
        const plan = await this.planModel.findOne({ name: 'Free' });
        obj.plan = plan._id as string;
      }

      obj.slug = obj.slug ?? Utils.slugifyText(obj.name);

      const workspace = await super.createNewObject(obj, activeSession);

      let members = [];

      if (memberEmails && memberEmails.length && redirectUrl) {
        const invitationPayload: CreateInvitationDto = {
          emails: memberEmails,
          redirectLink: redirectUrl,
          workspace: String(workspace._id),
        };
        members = await this.invitationService.createNewObject(invitationPayload, activeSession);
      }

      const [subscription, _] = await Promise.all([
        this.createSubscription(workspace, obj, activeSession),
        this.updateUser({ workspace, modules }, activeSession),
      ]);

      workspace.subscriptions = [subscription._id];
      workspace.modules = modules;
      workspace.members = members.map((m) => m._id);

      await workspace.save({ session: activeSession });

      // Only commit if we created the transaction
      if (localSession) {
        await localSession.commitTransaction();
      }

      return workspace;
    } catch (e) {
      // Only abort if we created the transaction
      if (localSession) {
        await localSession.abortTransaction();
      }
      throw e;
    } finally {
      // Only end the session if we created it
      if (localSession) {
        await localSession.endSession();
      }
    }
  }

  public async buildModelQueryObject(pagination: Pagination, queryParser: QueryParser, req?: Request) {
    const user = req.user['_id'];
    _.extend(queryParser.query, { user });
    return super.buildModelQueryObject(pagination, queryParser, req);
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

  /**
   * Switches a user's current active workspace
   * @param id The ID of the workspace to switch to
   * @param user The user object from the JWT token
   * @returns The workspace details with modules and subscriptions
   */
  async switchWorkspace(id: string, authId: string) {
    try {
      // Find workspace and verify access
      const workspace = await this.model.findOne({
        ...Utils.conditionWithDelete({ _id: id }),
      });

      if (!workspace) {
        throw AppException.NOT_FOUND(lang.get('workspace').notFound);
      }

      // Verify ownership or membership
      const isOwner = workspace.user.toString() === authId.toString();

      if (!isOwner) {
        throw AppException.FORBIDDEN(lang.get('workspace').unAuthorized);
      }

      await this.model.updateMany({ user: authId, isDefault: true, _id: { $ne: id } }, { $set: { isDefault: false } });

      workspace.isDefault = true;
      await workspace.save();

      await this.redisService.set(`workspace_${authId}`, workspace._id);

      return {
        ...workspace.toJSON(),
        isOwner,
      };
    } catch (e) {
      throw e;
    }
  }

  async acceptInvitation(payload: { token: string; email: string; password: string }) {
    const { token, email, password } = payload;
    const session = await this.model.startSession();
    try {
      session.startTransaction();
      const invitation = await this.invitationModel.findOne({ token, email });
      if (!invitation) {
        throw AppException.BAD_REQUEST('Invalid invitation token or email');
      }

      const auth = await this.authService.createNewObject({ email, password }, session);
      const [newMember, user] = await Promise.all([
        await this.userService.createNewObject({ ...auth, _id: auth._id, authId: auth._id, role: '' }, session),
        await new this.memberModel({ email, user: auth._id, workspace: invitation.workspace }).save({ session }),
      ]);

      await session?.commitTransaction();

      return {
        ...user,
        member: newMember,
      };
    } catch (e) {
      await session?.abortTransaction();
      throw e;
    } finally {
      await session?.endSession();
    }
  }

  // async createWorkspace(payload, userId) {
  //   // Check if this is the user's first workspace
  //   const existingWorkspaces = await this.model.find({ user: userId });
  //   const isFirstWorkspace = existingWorkspaces.length === 0;

  //   // Create workspace with isCurrent set to true if it's the first workspace
  //   const workspace = new this.model({
  //     ...payload,
  //     user: userId,
  //     isCurrent: isFirstWorkspace, // First workspace is automatically current
  //     publicId: Utils.generateUniqueId(this.defaultConfig.idToken),
  //   });

  //   // Save workspace
  //   const created = await workspace.save();

  //   return created;
  // }

  async findCurrentWorkspace(userId: string) {
    return this.model.findOne({
      user: userId,
      isCurrent: true,
    });
  }
}
