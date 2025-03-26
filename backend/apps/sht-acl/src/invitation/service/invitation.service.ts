import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MongoBaseService,
  InvitationDocument,
  Invitation,
  CreateInvitationDto,
  Utils,
  WorkService,
  Workspace,
  WorkspaceDocument,
  AppException,
  Dict,
  Pagination,
  QueryParser,
} from 'shtcut/core';
import { ClientSession, Model, Types } from 'mongoose';
import { InvitationEmail } from '../invitation.email';
import { ConfigService } from '@nestjs/config';
import lang from '../../../lang';
import { Request } from 'express';
import { WorkspaceModel, WorkspaceDocument as WorkspaceModelDocument } from 'shtcut/core/models/workspace/workspace.schema';

@Injectable()
export class InvitationService extends MongoBaseService {
  constructor(
    @InjectModel(Invitation.name) protected model: Model<InvitationDocument>,
    @InjectModel(Workspace.name) protected workspaceModel: Model<WorkspaceDocument>,
    protected config: ConfigService,
    private workerService: WorkService,
  ) {
    super(model);
    this.routes = {
      create: true,
      find: true,
      findOne: false,
      update: true,
      patch: true,
      remove: false,
    };
  }

  public async buildModelQueryObject(pagination: Pagination, queryParser: QueryParser, req?: Request) {
    try {
      queryParser.query.user = req.user['_id'];
      return super.buildModelQueryObject(pagination, queryParser, req);
    } catch (e) {
      throw e;
    }
  }

  /**
   * The function creates new invitations for a workspace, checks for existing emails, generates unique
   * tokens, saves the invites, and sends invitation emails.
   * @param {CreateInvitationDto} obj - The `obj` parameter in the `createNewObject` function is of
   * type `CreateInvitationDto`, which likely contains information needed to create a new invitation
   * object. This object includes properties such as `emails`, `workspace`, and `token`. The function
   * checks if any existing invitations with the same
   * @param {ClientSession} [session] - The `session` parameter in the `createNewObject` function is an
   * optional parameter of type `ClientSession`. It allows you to pass a MongoDB client session to the
   * function for handling transactions or other database operations within the session scope. If a
   * session is provided when calling this function, the operations will
   * @returns The `createNewObject` function is returning the saved invitations after creating new
   * objects and sending invitation emails.
   */
  public async createNewObject(obj: CreateInvitationDto, session?: ClientSession) {
    try {
      const { emails, workspace, token } = obj;

      const found = await this.model.find({ email: { $in: emails }, workspace, deleted: false });
      if (found && found.length) {
        throw AppException.CONFLICT(lang.get('invitation').existingEmail);
      }

      const invitations = emails.map((email) => ({
        email,
        workspace,
        publicId: Utils.generateUniqueId('inv'),
        token: token ?? Utils.generateCode(20, true),
      }));


      // Save invitations first
      const savedInvites = await this.model.insertMany(invitations, { session });



      // Check if we're in a transaction from workspace creation
      const isPartOfTransaction = !!session;

      if (isPartOfTransaction) {
        // If in a transaction, schedule processing for later WITHOUT passing the session

        // Store the workspace ID for later use
        const workspaceId = workspace;

        setTimeout(() => {
          // Create a copy of the object without the session
          const objCopy = { ...obj };

          this.processInvitationsBackgroundSafe(savedInvites, objCopy, workspaceId)
            .catch(err => console.error("Background invitation processing error:", err));
        }, 1000); // Wait 1 second to ensure transaction is fully committed

        return savedInvites;
      } else {
        // For direct API calls, process immediately with workspace lookup first
        const inviteeWorkspace = await this.workspaceModel.findOne({
          ...Utils.conditionWithDelete({ _id: workspace, active: true })
        });

        await this.processInvitations(savedInvites, obj);
        return savedInvites;
      }
    } catch (e) {
      throw e;
    }
  }

  private async processInvitations(savedInvites: any[], obj: any) {
    const { workspace } = obj;

    const workspaceId = new Types.ObjectId(workspace);

    const inviteeWorkspace = await this.workspaceModel.findOne({ _id: workspaceId });

    if (!inviteeWorkspace) {
      throw new Error('Workspace not found');
    }

    savedInvites.forEach((invitation: any) => {
      const { email, token, _id } = invitation;
      const link = `${obj.redirectLink}?email=${email}&workspace=${inviteeWorkspace._id}&token=${token}`;


      if (inviteeWorkspace) {
        inviteeWorkspace.members.push(_id);
      } else {
        console.error('Invitee workspace is null');
      }

      this.sendInvitationEmail({ email, workspace: inviteeWorkspace?.name, link });
    });

    // Save the updated workspace with new members
    await inviteeWorkspace.save();
  }

  // New method for background processing without sessions
  private async processInvitationsBackgroundSafe(savedInvites: any[], obj: any, workspaceId: string) {
    try {

      // Find the workspace without using the original session
      const inviteeWorkspace = await this.workspaceModel.findOne({ _id: new Types.ObjectId(workspaceId) });

      if (!inviteeWorkspace) {
        console.error('Workspace not found in background processing');
        return;
      }

      // Initialize members array if needed
      if (!inviteeWorkspace.members) {
        inviteeWorkspace.members = [];
      }

      // Process invitations
      for (const invitation of savedInvites) {
        const { email, token, _id } = invitation;
        const link = `${obj.redirectLink}?email=${email}&workspace=${inviteeWorkspace._id}&token=${token}`;

        // Add member if not already there
        if (!inviteeWorkspace.members.some(m => m.toString() === _id.toString())) {
          inviteeWorkspace.members.push(_id);
        }

        // Send email
        this.sendInvitationEmail({
          email,
          workspace: inviteeWorkspace.name,
          link
        });
      }

      // Save workspace
      await inviteeWorkspace.save();
    } catch (error) {
      console.error("Error in background invitation processing:", error);
    }
  }

  /**
   * The function `sendInvitationEmail` sends an invitation email to a specified email address for a
   * workspace with a provided link.
   * @param payload - The `payload` object contains the following properties:
   */
  private async sendInvitationEmail(payload: { email: string; workspace: string; link: string }) {
    const { email, workspace, link } = payload;
    const invitationEmail = InvitationEmail.sendEmail({
      to: email,
      from: this.config.get('worker.email.sendgrid.email'),
      workspace,
      link,
      template: this.config.get('app.templates.workspaceInvite'),
    });
    this.workerService.queueToSendEmail(invitationEmail);
  }
}
