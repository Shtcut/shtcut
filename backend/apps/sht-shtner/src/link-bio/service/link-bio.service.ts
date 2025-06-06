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
    let linkBio: LinkBioDocument = await super.searchOneObject(query);
    const clicks: number = (linkBio?.clicks || 0) + 1;
    if (linkBio) linkBio = await super.updateObject(linkBio.id, { clicks });
    return linkBio;
  }
}
