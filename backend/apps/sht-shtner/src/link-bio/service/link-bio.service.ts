import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hit, HitDocument, LinkBio, LinkBioDocument, MongoBaseService } from 'shtcut/core';

@Injectable()
export class LinkBioService extends MongoBaseService {
  constructor(
    @InjectModel(LinkBio.name) protected model: Model<LinkBioDocument>,
    @InjectModel(Hit.name) protected hitModel: Model<HitDocument>,
  ) {
    super(model);
  }

  async searchOneObject(query: Record<string, any>) {
    let object = await super.searchOneObject(query);
    const clicks: number = (object?.clicks || 0) + 1;
    if (object) object = super.updateObject(object.id, { clicks });
    return object;
  }
}
