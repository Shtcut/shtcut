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
} from 'shtcut/core';

import * as bcrypt from 'bcrypt';
import { HitService } from '../../hit';
import * as _ from 'lodash';
import { Workspace, WorkspaceDocument } from 'shtcut/core/models/workspace';

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
    super(model);
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

      if (alias) {
        if (link) {
          throw AppException.CONFLICT(lang.get('link').duplicate);
        }
      }

      if (owner) {
        const user = await this.userModel.findOne({ _id: owner, deleted: false, active: true });
        if (!user) {
          throw AppException.NOT_FOUND(lang.get('user').notFound);
        }
      }

      if (workspace) {
        const foundWorkspace = await this.workspaceModel.find({
          user: owner,
          domains: { $in: domain },
        });
        if (!foundWorkspace) {
          throw AppException.NOT_FOUND(lang.get('workspace').invalidDomain);
        }
      }

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
      if (password) {
        obj.password = await bcrypt.hash(obj.password, 10);
      }
      const alias = Utils.generateCode(7, true);
      const domain = await this.domainModel.findOne({ name: obj.domain });
      if (!domain) {
        throw AppException.NOT_FOUND(lang.get('domain').notFound);
      }
      const { verification } = domain;
      if (!verification.verified) {
        throw AppException.NOT_FOUND(lang.get('domain').notVerified);
      }
      const payload = {
        ...obj,
        alias,
        enableTracking: !!user,
        isPrivate: !!password,
        domain: domain._id,
      };
      const link = await super.createNewObject(payload);
      const qrCode = await new this.qrCodeModel({
        ...obj.qrCode,
        ...obj,
        user,
        link: link._id,
        workspace: domain.workspace,
        domain: domain._id,
      }).save();
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
      const link = await this.model.findOne({ alias, domain: { $in: [userDomain] } }).populate(['domain']);
      if (!link) {
        return null;
      }
      if (link.enableTracking) {
        const payload = {
          user: link.user,
          link: link._id,
          domain: link.domain._id,
          ...ipAddressInfo,
        };
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
      link.clicks += 1;
      return await link.save();
    } catch (e) {
      throw e;
    }
  }
}
