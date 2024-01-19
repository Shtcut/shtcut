import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlanDocument, Plan, NoSQLBaseService } from 'shtcut/core';
import { Model } from 'mongoose';
import * as _ from 'lodash';

@Injectable()
export class PlanService extends NoSQLBaseService {
  constructor(@InjectModel(Plan.name) protected model: Model<PlanDocument>) {
    super(model);
  }
}
