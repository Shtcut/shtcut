import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hit, HitDocument, HitType, Link, LinkDocument, NoSQLBaseService, Utils } from 'shtcut/core';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(Hit.name) protected model: Model<HitDocument>,
    @InjectModel(Link.name) protected linkModel: Model<LinkDocument>,
    protected config: ConfigService,
  ) {}

  public async processVisit({
    remoteAddress,
    userAgent,
    backHalf,
    owner,
  }: {
    remoteAddress: string | string[];
    backHalf: string;
    userAgent: string;
    owner?: string;
  }) {
    try {
      let link = await this.linkModel.findOne({ backHalf });
      if (!link) {
        return null;
      }
      //   if (link.enableTracking) {
      await this.handleLinkHit({ link: link._id, userAgent, ip: remoteAddress as string, owner });
      //   }
      link.hitCount = link.hitCount + 1;
      link = await link.save();
      return link;
    } catch (e) {
      throw e;
    }
  }

  async handleLinkHit({ link, userAgent, ip, owner }: HitType) {
    try {
      const parser = require('ua-parser-js');
      const parsedUserAgent = parser(userAgent);
      const { browser, os: OS } = parsedUserAgent;
      console.log('browser:', browser);
      console.log('OS:', OS);
      if (ip) {
        const ipRegistryKey = this.config.get('app.ipregistry.apiKey');
        const ispInfo = await Utils.ispInfo({ ipRegistryKey, ip });
        const { type, location, isp } = ispInfo;
        const hit = new this.model({
          publicId: Utils.generateUniqueId('hit'),
          type,
          location,
          isp,
          link,
          owner,
          browser,
          OS,
        });
        return await hit.save();
      }
      return null;
    } catch (e) {
      throw e;
    }
  }
}
