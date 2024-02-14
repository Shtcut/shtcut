import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBaseService, Permission, PermissionDocument } from 'shtcut/core';

@Injectable()
export class PermissionService extends MongoBaseService {
  constructor(@InjectModel(Permission.name) protected model: Model<PermissionDocument>) {
    super(model);
  }
}
