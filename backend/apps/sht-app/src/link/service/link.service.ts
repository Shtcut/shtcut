import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-app/lang';
import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';
import {
  AppException,
  CreateLinkDto,
  Dict,
  Domain,
  DomainDocument,
  Hit,
  HitDocument,
  IpAddressInfo,
  IpService,
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
import { Request } from 'express';

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
    protected ipService: IpService,
    protected redisService: RedisService,
  ) {
    super(model, redisService);
    this.routes = {
      create: true,
      find: true,
      findOne: false,
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
        const user = await this.userModel.findOne({ ...Utils.conditionWithDelete({ _id: owner }) });
        if (!user) {
          throw AppException.NOT_FOUND(lang.get('user').notFound);
        }
      }

      // Check if the workspace and domain are valid
      if (workspace) {
        const foundWorkspace = await this.workspaceModel.find({
          ...Utils.conditionWithDelete({
            user: owner,
            domains: { $in: domain },
          }),
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

  public async createNewObject(obj: CreateLinkDto & Dict, session?: ClientSession) {
    try {
      session = await this.model.startSession();
      session.startTransaction();

      const { password, user } = obj;

      // Hash password if present
      if (password) {
        obj.password = await bcrypt.hash(obj.password, 10);
        obj.isPrivate = true;
      }

      // Generate alias and find associated domain
      const alias = obj.alias ? obj.alias : Utils.generateCode(7, true);

      const domain = await this.domainModel.findOne({ ...Utils.conditionWithDelete({ _id: obj.domain }) });
      this.ensureDomainExists(domain);

      // Check if the domain is verified
      this.checkDomainVerification(domain);

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
      let link = await super.createNewObject(payload, session);
      const qrCode = await new this.qrCodeModel({
        ...obj.qrCode,
        ...obj,
        publicId: Utils.generateUniqueId('qrc'),
        user,
        link: link._id,
        workspace: domain.workspace,
        domain: domain._id,
      }).save({ session });

      // Associate QR code with link and save link
      link.qrCode = qrCode._id;
      link = await link.save({ session });

      await session?.commitTransaction();

      return link;
    } catch (e) {
      await session?.abortTransaction();
      throw e;
    } finally {
      await session?.endSession();
    }
  }

  public async visit(req: Request, domainName: string, alias: string) {
    try {
      const slug = Utils.slugifyText(domainName);
      console.log('condition:::', { ...Utils.conditionWithDelete({ slug }) });
      const domain = await this.domainModel.findOne({ ...Utils.conditionWithDelete({ slug }) });
      this.ensureDomainExists(domain);
      this.checkDomainVerification(domain);

      // Find link by alias and domain
      const link = await this.model.findOne({ alias, domain: domain._id }).populate(['domain']);
      if (!link) {
        return null;
      }

      // const ipAddressInfo = await this.ipService.getClientIpInfo(req);
      // console.log('ipAddressInfo::', ipAddressInfo);

      // If tracking is enabled, update hit information
      if (link.enableTracking) {
        const payload = {
          user: link.user,
          link: link._id,
          domain: domain._id,
          // ...ipAddressInfo,
        };

        // Update or create hit record
        await this.hitModel.findOneAndUpdate(
          { link: link._id, domain: payload.domain },
          {
            ...payload,
            // lastClicked: payload.timezone.currentTime ?? Date.now(),
            domain: domain._id,
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

  private ensureDomainExists(domain) {
    if (!domain) {
      throw AppException.NOT_FOUND(lang.get('domain').notFound);
    }
  }

  private checkDomainVerification(domain) {
    const { verification } = domain;
    if (!verification.verified) {
      throw AppException.NOT_FOUND(lang.get('domain').notVerified);
    }
  }
}
