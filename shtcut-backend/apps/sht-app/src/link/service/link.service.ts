import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-app/lang';
import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';
import {
  AppException,
  CreateLinkDto,
  Link,
  LinkDocument,
  NoSQLBaseService,
  User,
  UserDocument,
  Utils,
} from 'shtcut/core';

import * as bcrypt from 'bcrypt';

@Injectable()
export class LinkService extends NoSQLBaseService {
  constructor(
    @InjectModel(Link.name) protected model: Model<LinkDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
  ) {
    super(model);
  }

  public async createNewObject(obj: CreateLinkDto, session?: ClientSession) {
    try {
      const { backHalf, owner, password } = obj;
      let customBackHalf = null;
      const link = await this.model.findOne({ backHalf });

      if (backHalf) {
        if (link) {
          throw AppException.CONFLICT(lang.get('link').duplicate);
        }
      }

      if (owner) {
        const user = await this.userModel.findOne({ _id: owner, deleted: false, active: true });
        if (!user) {
          throw AppException.NOT_FOUND(lang.get('user').notFound);
        }
      }

      if (password) {
        obj.password = await bcrypt.hash(obj.password, 10);
      }
      customBackHalf = Utils.generateCode(7, true);
      const payload = {
        backHalf: customBackHalf,
        enableTracking: !!owner,
        ...obj,
      };

      return await super.createNewObject(payload);
    } catch (e) {
      throw e;
    }
  }
}
