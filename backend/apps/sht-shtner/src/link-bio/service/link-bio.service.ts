import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { FilterQuery, Model } from 'mongoose';
import { AnalyticsOptionsDto, Hit, HitDocument, LinkBio, LinkBioDocument, MongoBaseService, Utils } from 'shtcut/core';
import { AnalyticsService } from '../../_shard';

@Injectable()
export class LinkBioService extends MongoBaseService {
  constructor(
    @InjectModel(LinkBio.name) protected model: Model<LinkBioDocument>,
    @InjectModel(Hit.name) protected hitModel: Model<HitDocument>,
  ) {
    super(model);
  }

  async searchOneObject(query: Record<string, any>) {
    let linkBio: LinkBioDocument = await super.searchOneObject(query);
    const clicks: number = (linkBio?.clicks || 0) + 1;
    if (linkBio) linkBio = await super.updateObject(linkBio.id, { clicks });
    return linkBio;
  }

  /**
   * The function "analytics" in TypeScript is an asynchronous function that accepts a parameter
   * "linkBioId" and includes a try-catch block for error handling.
   * @param linkBioId - The `linkBioId` parameter in the `analytics` function likely represents the unique
   * identifier or reference to a specific link that is being tracked for analytics purposes. This
   * parameter would be used within the function to gather data and perform analytics related to that
   * particular link.
   */
  public async analytics(req: Request, linkBioId: string, options: AnalyticsOptionsDto) {
    try {
      const user = req.user['_id'];
      const filter: FilterQuery<Hit> = { link: Utils.toObjectId(linkBioId), user: Utils.toObjectId(user) };
      const field = 'clicks';
      const linkBio = await super.searchOneObject({ _id: linkBioId });
      const [plotData, weeklyChange, sourceDistribution] = await AnalyticsService.analytics(
        this.hitModel,
        options,
        filter,
        field,
      );
      return { clicks: { summary: weeklyChange, sourceDistribution, plotData, linkBio } };
    } catch (e) {}
  }
}
