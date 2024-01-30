import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-app/lang';
import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';
import {
  AppException,
  CreateLinkDto,
  Domain,
  DomainDocument,
  Hit,
  HitDocument,
  IpAddressInfo,
  Link,
  LinkDocument,
  MongoBaseService,
  QrCode,
  QrCodeDocument,
  RedisService,
  User,
  UserDocument,
  Utils,
  Workspace,
  WorkspaceDocument,
} from 'shtcut/core';

import * as bcrypt from 'bcrypt';
import { HitService } from '../../hit';
import * as _ from 'lodash';

@Injectable()
export class LinkService extends MongoBaseService {
  constructor(
    @InjectModel(Link.name) protected model: Model<LinkDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
    @InjectModel(Workspace.name) protected workspaceModel: Model<WorkspaceDocument>,
    @InjectModel(Domain.name) protected domainModel: Model<DomainDocument>,
    @InjectModel(Hit.name) protected hitModel: Model<HitDocument>,
    @InjectModel(QrCode.name) protected qrCodeModel: Model<QrCodeDocument>,
    protected hitService: HitService,
    protected redisService: RedisService,
  ) {
    super(model, redisService);
    this.routes = {
      create: true,
      find: false,
      findOne: true,
      update: true,
      patch: true,
      remove: true,
    };
  }

  public async validateCreate(obj: CreateLinkDto) {
    try {
      const { alias, user: owner, expiryDate, workspace, domain } = obj;
      const link = await this.model.findOne({ alias });

      // Check for duplicate alias
      if (alias && link) {
        throw AppException.CONFLICT(lang.get('link').duplicate);
      }

      // Check if the owner user exists
      if (owner) {
        const user = await this.userModel.findOne({ _id: owner, deleted: false, active: true });
        if (!user) {
          throw AppException.NOT_FOUND(lang.get('user').notFound);
        }
      }

      // Check if the workspace and domain are valid
      if (workspace) {
        const foundWorkspace = await this.workspaceModel.find({
          user: owner,
          domains: { $in: domain },
        });

        if (!foundWorkspace) {
          throw AppException.NOT_FOUND(lang.get('workspace').invalidDomain);
        }
      }

      // Check if the expiry date is valid
      if (expiryDate) {
        const date = new Date(expiryDate);
        if (_.isNaN(date.getTime())) {
          throw AppException.BAD_REQUEST(lang.get('link').invalidExpiryDate);
        }
        if (new Date(expiryDate) < new Date()) {
          throw AppException.BAD_REQUEST(lang.get('link').invalidateExpiryFutureDate);
        }
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  public async createNewObject(obj: CreateLinkDto, session?: ClientSession) {
    try {
      const { password, user } = obj;

      // Hash password if present
      if (password) {
        obj.password = await bcrypt.hash(obj.password, 10);
      }

      // Generate alias and find associated domain
      const alias = Utils.generateCode(7, true);
      const domain = await this.domainModel.findOne({ name: obj.domain });
      if (!domain) {
        throw AppException.NOT_FOUND(lang.get('domain').notFound);
      }

      // Check if the domain is verified
      const { verification } = domain;
      if (!verification.verified) {
        throw AppException.NOT_FOUND(lang.get('domain').notVerified);
      }

      // Create payload with additional properties and create link
      const payload = {
        ...obj,
        alias,
        enableTracking: !!user,
        isPrivate: !!password,
        domain: domain._id,
        workspace: domain.workspace,
      };

      // Create and save associated QR code
      const link = await super.createNewObject(payload);
      const qrCode = await new this.qrCodeModel({
        ...obj.qrCode,
        ...obj,
        user,
        link: link._id,
        workspace: domain.workspace,
        domain: domain._id,
      }).save();

      // Associate QR code with link and save link
      link.qrCode = qrCode._id;

      return await link.save();
    } catch (e) {
      throw e;
    }
  }

  public async processVisit({
    domain: userDomain,
    alias,
    ipAddressInfo,
  }: {
    domain: string;
    alias: string;
    ipAddressInfo: IpAddressInfo;
  }) {
    try {
      // Find link by alias and domain
      const link = await this.model.findOne({ alias, domain: { $in: [userDomain] } }).populate(['domain']);
      if (!link) {
        return null;
      }

      // If tracking is enabled, update hit information
      if (link.enableTracking) {
        const payload = {
          user: link.user,
          link: link._id,
          domain: link.domain._id,
          ...ipAddressInfo,
        };

        // Update or create hit record
        await this.hitModel.findOneAndUpdate(
          { link: link._id, domain: payload.domain },
          {
            ...payload,
            lastClicked: payload.timezone.currentTime ?? Date.now(),
            $inc: { clicks: 1 },
          },
          {
            ...Utils.mongoUpdateDefaultProps(),
          },
        );
      }

      // Increment click count and save link
      link.clicks += 1;
      return await link.save();
    } catch (e) {
      throw e;
    }
  }
}
