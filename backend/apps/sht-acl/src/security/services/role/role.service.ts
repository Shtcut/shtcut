import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { ClientSession, Model } from 'mongoose';
import { Dict, MongoBaseService, Role, RoleDocument } from 'shtcut/core';

@Injectable()
export class RoleService extends MongoBaseService {
  constructor(@InjectModel(Role.name) protected model: Model<RoleDocument>) {
    super(model);
  }

  public async createNewObject(obj: Dict, session?: ClientSession, req?: Request) {
    obj.workspace = String(obj.workspace);
    return super.createNewObject(obj, session, req);
  }
}
