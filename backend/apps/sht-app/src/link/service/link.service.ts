import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-app/lang';
import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';
import {
  AppException,
  CreateLinkDto,
  Link,
  LinkDocument,
  NoSQLBaseService,
  User,
  UserDocument,
  Utils,
} from 'shtcut/core';

import * as bcrypt from 'bcrypt';
import { HitService } from '../../hit';
import * as _ from 'lodash';
import { Campaign, CampaignDocument } from 'shtcut/core/models/campaign';

@Injectable()
export class LinkService extends NoSQLBaseService {
  constructor(
    @InjectModel(Link.name) protected model: Model<LinkDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
    @InjectModel(Campaign.name) protected campaignModel: Model<CampaignDocument>,
    protected hitService: HitService,
  ) {
    super(model);
  }

  public async validateCreate(obj: CreateLinkDto) {
    try {
      const { backHalf, owner, expiryDate, campaign, domain } = obj;
      const link = await this.model.findOne({ alias: backHalf });

      if (backHalf) {
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

      if (campaign) {
        const foundCampaign = await this.campaignModel.find({
          user: owner,
          domains: { $in: domain },
        });
        if (!foundCampaign) {
          throw AppException.NOT_FOUND(lang.get('campaign').invalidDomain);
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
      const { password, owner } = obj;
      if (password) {
        obj.password = await bcrypt.hash(obj.password, 10);
      }
      const customBackHalf = Utils.generateCode(7, true);
      const payload = {
        backHalf: customBackHalf,
        enableTracking: !!owner,
        ...obj,
      };
      const link = await super.createNewObject(payload);
      return link;
    } catch (e) {
      throw e;
    }
  }

  public async processVisit({
    remoteAddress,
    userAgent,
    backHalf,
  }: {
    remoteAddress: string | string[];
    backHalf: string;
    userAgent: string;
  }) {
    try {
      let link = await this.model.findOne({ alias: backHalf });
      if (!link) {
        return null;
      }
      if (link.enableTracking) {
        const payload = {
          user: link.owner,
          link: link._id,
        };
        await this.hitService.createNewObject({ link: link._id, userAgent, ip: remoteAddress as string });
      }
      link.hitCount = link.hitCount + 1;
      link = await link.save();
      return link;
    } catch (e) {
      throw e;
    }
  }
}
