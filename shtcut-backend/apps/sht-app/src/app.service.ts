import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { App, AppDocument, NoSQLBaseService } from 'shtcut/core';

@Injectable()
export class AppService extends NoSQLBaseService {
  constructor(
    @InjectModel(App.name) protected model: Model<AppDocument>,
    protected config: ConfigService,
  ) {
    super(model);
  }

  async getApps() {
    return this.model.find({ deleted: false, active: true });
  }
}
