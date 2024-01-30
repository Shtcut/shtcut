import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-app/lang';
import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';
import {
  AppException,
  CreateDomainDto,
  Domain,
  DomainDocument,
  MongoBaseService,
  Utils,
  VerifyDomainDto,
  Workspace,
  WorkspaceDocument,
} from 'shtcut/core';
import * as _ from 'lodash';
@Injectable()
export class DomainService extends MongoBaseService {
  constructor(
    @InjectModel(Domain.name) protected model: Model<DomainDocument>,
    @InjectModel(Workspace.name) protected workspaceModel: Model<WorkspaceDocument>,
  ) {
    super(model);
  }

  public async validateCreate(obj: CreateDomainDto) {
    try {
      const { workspace, name } = obj;
      const slug = Utils.slugifyText(name);
      const domain = await this.model.findOne({ slug });
      if (domain) {
        const { verification } = domain;
        if (verification.verified) {
          throw AppException.NOT_FOUND(lang.get('domain').verified);
        }
        throw AppException.CONFLICT(lang.get('domain').duplicate);
      }
      const foundWorkspace = await this.workspaceModel.findOne({
        _id: workspace,
      });
      if (!foundWorkspace) {
        throw AppException.NOT_FOUND(lang.get('workspace').notFound);
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  public async createNewObject(payload: CreateDomainDto, session?: ClientSession) {
    try {
      session = await this.model.startSession();
      session.startTransaction();

      const code = Utils.generateUniqueId('shtcut-verification-site');
      const domain = await super.createNewObject({ ...payload }, session);

      if (domain) {
        domain.verification = {
          code,
          verified: false,
          dnsType: 'TXT',
        };
      }

      const workspace = await this.workspaceModel.findById(payload.workspace);
      workspace.domains.push(domain._id);

      await Promise.all([await domain.save({ session }), await workspace.save({ session })]);

      await session.commitTransaction();
      return domain;
    } catch (e) {
      await session?.abortTransaction();
      throw e;
    } finally {
      await session?.endSession();
    }
  }

  public async verifyDomain(id: string) {
    try {
      const domain = await this.model.findById(id);
      if (!domain) {
        throw AppException.NOT_FOUND(lang.get('domain').notFound);
      }
      const verify = await this.canVerifyDomain(domain);
      if (verify instanceof AppException) {
        throw verify;
      }
      return verify;
    } catch (e) {
      throw e;
    }
  }

  private async canVerifyDomain(domain) {
    try {
      const { getDnsRecords } = require('@layered/dns-records');
      const txtRecords = await getDnsRecords(domain.name, 'TXT');
      const txtSpfRecord = txtRecords.find((r) => r.value.includes('shtcut-verification-site'));
      if (txtRecords && txtRecords.value) {
        const { value } = txtRecords;
        const code = value.split('-')[3];
        if (code && String(code).trim() === String(domain.code).trim()) {
          domain.verification = {
            code: null,
            verified: true,
            dnsType: 'TXT',
          };
          await domain.save();
        }
      }
      return {
        record: txtRecords,
        domain,
      };
    } catch (e) {
      return AppException.INTERNAL_SERVER(lang.get('domain').verificationInprogress);
    }
  }
}
