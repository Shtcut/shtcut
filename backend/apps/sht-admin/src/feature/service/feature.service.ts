import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feature, FeatureDocument, MongoBaseService, Utils } from 'shtcut/core';
import { Model } from 'mongoose';
import * as _ from 'lodash';

@Injectable()
export class FeatureService extends MongoBaseService {
  constructor(@InjectModel(Feature.name) protected model: Model<FeatureDocument>) {
    super(model);
  }
}
