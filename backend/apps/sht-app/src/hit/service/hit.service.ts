import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';
import { Hit, HitDocument, HitType, NoSQLBaseService, Utils } from 'shtcut/core';

@Injectable()
export class HitService extends NoSQLBaseService {
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
