import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlanDocument, Plan, MongoBaseService } from 'shtcut/core';
import { Model } from 'mongoose';

@Injectable()
export class PlanService extends MongoBaseService {
  constructor(@InjectModel(Plan.name) protected model: Model<PlanDocument>) {
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
