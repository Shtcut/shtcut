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
} from 'shtcut/core';
import { ClientSession, Model } from 'mongoose';
import { InvitationEmail } from '../invitation.email';
import { ConfigService } from '@nestjs/config';
import lang from '../../../lang';

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
      find: false,
      findOne: false,
      update: true,
      patch: true,
      remove: false,
    };
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
  public async createNewObject(obj: CreateInvitationDto, session?: ClientSession): Promise<any> {
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

      const [savedInvites, inviteeWorkspace] = await Promise.all([
        await this.model.insertMany(invitations, { session }),
        await this.workspaceModel.findOne({ ...Utils.conditionWithDelete({ _id: workspace, active: true }) }),
      ]);

      savedInvites.forEach((invitation) => {
        const { email, token } = invitation;
        const link = `${obj.redirectLink}/${workspace}/${token}`;
        this.sendInvitationEmail({ email, workspace: inviteeWorkspace?.name, link });
      });

      return savedInvites;
    } catch (e) {
      throw e;
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
