import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoBaseService, Permissions, PermissionsDocument } from 'shtcut/core';

@Injectable()
export class PermissionService extends MongoBaseService {
  constructor(@InjectModel(Permissions.name) protected model: Model<PermissionsDocument>) {
    super(model);
  }
}
