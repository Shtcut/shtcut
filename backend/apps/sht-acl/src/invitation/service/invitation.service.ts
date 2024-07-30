import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MongoBaseService,
  InvitationDocument,
  Invitation,
  CreateInvitationDto,
  Utils,
  WorkService, Workspace, WorkspaceDocument, AppException,
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

  public async createNewObject(obj: CreateInvitationDto, session?: ClientSession): Promise<any> {
    try {
      const { emails, workspace, token } = obj;
      const found = await this.model.find({ email: { $in: emails }, workspace, deleted: false });
      if (found) {
        throw AppException.CONFLICT(lang.get('invitation').existingEmail);
      }
      const invitations = emails.map((email) => ({
        email,
        workspace,
        publicId: Utils.generateUniqueId('inv'),
        token: token ?? Utils.generateCode(20, true),
      }));

      const [savedInvites, inviteeWorkspace] = await Promise.all([
        await this.model.insertMany(invitations),
        await this.workspaceModel.findOne({ ...Utils.conditionWithDelete({ _id: workspace, active: true }) }),
      ]);

      savedInvites.forEach((invitation) => {
        const { email, token } = invitation;
        const link = `${obj.redirectLink}/${workspace}/${token}`;
        this.sendInvitationEmail({
          email,
          token,
          workspace: inviteeWorkspace.name,
          link,
        });
      });

      return savedInvites;
    } catch (e) {
      throw e;
    }
  }

  private async sendInvitationEmail(payload: { email: string, token: string, workspace: string, link: string }) {
    const { email, token, workspace, link } = payload;
    const invitationEmail = await InvitationEmail.sendEmail({
      to: email,
      from: this.config.get('worker.email.noReply.email'),
      workspace,
      link,
      template: this.config.get('app.templates.workspaceInvite'),
    });
    this.workerService.queueToSendEmail(invitationEmail);
  }
}
