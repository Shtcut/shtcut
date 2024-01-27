import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-app/lang';
import { Model } from 'mongoose';
import { AppException, CreateWorkspaceDto, MongoBaseService, Utils, Workspace, WorkspaceDocument } from 'shtcut/core';
import * as _ from 'lodash';

@Injectable()
export class WorkspaceService extends MongoBaseService {
  constructor(@InjectModel(Workspace.name) protected model: Model<WorkspaceDocument>) {
    super(model);
  }

  /**
   * The function validates if a workspace with the given name already exists and throws an exception
   * if it does.
   * @param {CreateWorkspaceDto} obj - The parameter `obj` is of type `CreateWorkspaceDto`.
   * @returns In the given code, if the `workspace` object is found in the database, an exception is
   * thrown with a message indicating a conflict. If the `workspace` object is not found, `null` is
   * returned.
   */
  public async validateCreate(obj: CreateWorkspaceDto) {
    try {
      const { name } = obj;
      const slug = Utils.slugifyText(name);
      const workspace = await this.model.findOne({ slug });
      if (workspace) {
        throw AppException.CONFLICT(lang.get('workspace').duplicate);
      }
      return null;
    } catch (e) {
      throw e;
    }
  }
}
