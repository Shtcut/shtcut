import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    let object = await super.searchOneObject(query);
    const clicks: number = (object?.clicks || 0) + 1;
    if (object) object = super.updateObject(object.id, { clicks });
    return object;
  }

  /**
   * The function "analytics" in TypeScript is an asynchronous function that accepts a parameter
   * "linkId" and includes a try-catch block for error handling.
   * @param linkId - The `linkId` parameter in the `analytics` function likely represents the unique
   * identifier or reference to a specific link that is being tracked for analytics purposes. This
   * parameter would be used within the function to gather data and perform analytics related to that
   * particular link.
   */
  public async analytics(linkId: string, options: AnalyticsOptionsDto) {
    try {
      const filter: FilterQuery<Hit> = { link: Utils.toObjectId(linkId) };
      const field = 'clicks';
      const [plotData, weeklyChange, sourceDistribution] = await Promise.all([
        AnalyticsService.getMonthlyPlotData(this.hitModel, options, filter, field),
        AnalyticsService.getWeeklyChange(this.hitModel, filter, field),
        AnalyticsService.getSourceDistribution(this.hitModel, options, filter, field),
      ]);
      return { clicks: { summary: weeklyChange, sourceDistribution, plotData } };
    } catch (e) {}
  }
}
