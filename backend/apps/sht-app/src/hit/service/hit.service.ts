import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';
import { Hit, HitDocument, HitType, NoSQLBaseService, Utils } from 'shtcut/core';

@Injectable()
export class HitService extends NoSQLBaseService {
  constructor(
    @InjectModel(Hit.name) protected model: Model<HitDocument>,
    private config: ConfigService,
  ) {
    super(model);
    this.routes = {
      create: false,
      find: true,
      findOne: true,
      update: false,
      patch: false,
      remove: false,
    };
  }

  public async createNewObject({ ip, link, userAgent, owner }: HitType, session?: ClientSession) {
    try {
      const parser = require('ua-parser-js');
      const parsedUserAgent = parser(userAgent);
      const { browser, os: OS } = parsedUserAgent;
      if (ip) {
        const ipRegistryKey = this.config.get('app.ipregistry.apiKey');
        const ispInfo = await Utils.ispInfo({ ipRegistryKey, ip });
        const { type, location, isp, timezone } = ispInfo;
        return await super.createNewObject({
          type,
          location,
          timezone,
          isp,
          link,
          owner,
          browser,
          OS,
        });
      }
      return null;
    } catch (e) {
      throw e;
    }
  }
}
