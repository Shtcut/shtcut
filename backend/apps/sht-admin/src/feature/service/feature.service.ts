import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feature, FeatureDocument, NoSQLBaseService, Utils } from 'shtcut/core';
import { Model } from 'mongoose';
import * as _ from 'lodash';

@Injectable()
export class FeatureService extends NoSQLBaseService {
  constructor(@InjectModel(Feature.name) protected model: Model<FeatureDocument>) {
    super(model);
  }
}
