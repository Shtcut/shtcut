import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { App, AppDocument, NoSQLBaseService } from 'shtcut/core';

@Injectable()
export class AppService extends NoSQLBaseService {
  constructor(@InjectModel(App.name) protected model: Model<AppDocument>) {
    super(model);
  }
}
