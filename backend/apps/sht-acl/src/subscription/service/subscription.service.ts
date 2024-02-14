import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlanDocument, Plan, MongoBaseService, SubscriptionDocument, Subscription } from 'shtcut/core';
import { Model } from 'mongoose';
import * as _ from 'lodash';

@Injectable()
export class SubscriptionService extends MongoBaseService {
  constructor(@InjectModel(Subscription.name) protected model: Model<SubscriptionDocument>) {
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
}
