import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Document, FilterQuery, Model } from 'mongoose';
import { Hit, HitDocument, IpService, MongoBaseService, Utils } from 'shtcut/core';

@Injectable()
export class ApiKeyService extends MongoBaseService {
  constructor(
    @InjectModel(Hit.name) protected model: Model<HitDocument>,
    private ipService: IpService,
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

  public async upsert(
    req: Request,
    module: 'link' | 'linkBio' | 'qrCode',
    obj: { enableTracking: boolean; user: string } & Document,
    domain?: string,
  ) {
    if (obj.enableTracking && obj.user) {
      const ipAddressInfo = await this.ipService.getClientIpInfo(req);
      const payload = {
        user: obj.user,
        ...ipAddressInfo,
      };
      const filter: FilterQuery<Hit> = { [module]: obj._id };
      if (module == 'link') {
        filter['domain'] = domain;
        payload[domain] = domain;
      }
      // Update or create hit record
      await this.model.findOneAndUpdate(
        { [module]: obj._id },
        {
          ...payload,
          lastClicked: payload.timezone.currentTime ?? Date.now(),
          $set: {
            publicId: Utils.generateUniqueId('hit'),
          },
          $inc: { clicks: 1 },
        },
        {
          ...Utils.mongoDefaultUpdateProps(),
        },
      );
    }
  }
}
