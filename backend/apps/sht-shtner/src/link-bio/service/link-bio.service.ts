import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LinkBio, LinkBioDocument, MongoBaseService } from 'shtcut/core';

@Injectable()
export class LinkBioService extends MongoBaseService {
  constructor(@InjectModel(LinkBio.name) protected model: Model<LinkBioDocument>) {
    super(model);
  }

  async searchOneObject(query: Record<string, any>) {
    const object = await super.searchOneObject(query);
    const clicks: number = (object?.clicks || 0) + 1;
    if (object) super.updateObject(object.id, { clicks });
    return object;
  }
}
