import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hit, HitDocument, MongoBaseService } from 'shtcut/core';

@Injectable()
export class HitService extends MongoBaseService {
  constructor(@InjectModel(Hit.name) protected model: Model<HitDocument>) {
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
