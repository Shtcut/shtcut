import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-app/lang';
import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';
import {
  AppException,
  CreateDomainDto,
  Dict,
  Domain,
  DomainDocument,
  MongoBaseService,
  OK,
  RedisService,
  Utils,
  VercelService,
  Workspace,
  WorkspaceDocument,
} from 'shtcut/core';
import * as _ from 'lodash';

const { getDnsRecords } = require('@layered/dns-records');

@Injectable()
export class DomainService extends MongoBaseService {
  constructor(
    @InjectModel(Domain.name) protected model: Model<DomainDocument>,
    @InjectModel(Workspace.name) protected workspaceModel: Model<WorkspaceDocument>,
    protected cacheService: RedisService,
    protected vercelService: VercelService,
  ) {
    super(model, cacheService);
  }

  public async validateCreate(obj: CreateDomainDto & Dict) {
    try {
      const slug = Utils.slugifyText(obj.name);

      // Check if domain with the same slug exists
      const domain = await this.model.findOne({ ...Utils.conditionWithDelete({ slug }) });
      if (domain) {
        throw AppException.CONFLICT(lang.get('domain').duplicate);
      }

      // Check if the workspace exists
      const workspace = await this.workspaceModel.findOne({
        ...Utils.conditionWithDelete({ _id: obj.workspace, user: obj.user }),
      });

      this.ensureWorkspaceExists(workspace);

      return null;
    } catch (e) {
      throw e;
    }
  }

  public async createNewObject(payload: CreateDomainDto, session?: ClientSession) {
    try {
      session = session || (await this.model.startSession());
      session.startTransaction();

      const response = await this.vercelService.addDomain(payload.name);
      if (response instanceof AppException) {
        throw response;
      }
      const { status, data } = response;
      console.log('data::', data);

      const domain = await super.createNewObject({ ...payload }, session);

      if (domain && status === OK) {
        domain.verification = data?.verification ?? [];
      }

      const workspace = await this.workspaceModel.findById(payload.workspace);

      this.ensureWorkspaceExists(workspace);

      workspace.domains.push(domain._id);
      await Promise.all([domain.save({ session: session }), workspace.save({ session })]);

      await session?.commitTransaction();

      return domain;
    } catch (e) {
      Promise.all([await session?.abortTransaction(), await this.vercelService.removeDomain(payload.name)]);
      throw e;
    } finally {
      await session?.endSession();
    }
  }

  public async verifyDomain(id: string) {
    try {
      const cacheKey = `${this.modelName}:${id}`;
      const domain = (await this.getCachedDomain(cacheKey)) || (await this.fetchDomainFromDatabase(id, cacheKey));

      this.ensureDomainExists(domain);

      const verify = await this.canVerifyDomain(domain);
      if (verify instanceof AppException) {
        throw verify;
      }

      return verify;
    } catch (e) {
      throw e;
    }
  }

  private async getCachedDomain(cacheKey: string) {
    return await this.cacheService?.getAsObj(cacheKey);
  }

  private async fetchDomainFromDatabase(id: string, cacheKey: string) {
    const domain = await this.model.findById(id);
    if (domain) {
      await this.cacheService?.set(cacheKey, domain, '1m');
    }
    return domain;
  }

  private ensureDomainExists(domain) {
    if (!domain) {
      throw AppException.NOT_FOUND(lang.get('domain').notFound);
    }
  }

  private ensureWorkspaceExists(workspace) {
    if (!workspace) {
      throw AppException.NOT_FOUND(lang.get('workspace').notFound);
    }
  }

  private async canVerifyDomain(domain) {
    try {
      const [domainInfo, domainConfig] = await Promise.all([
        await this.vercelService.getDomain(domain.name),
        await this.vercelService.getDomainConfig(domain.name),
      ]);
      const response = await this.vercelService.verifyDomain(domain.name);
      if (response instanceof AppException) {
        throw response;
      }
      const { status, data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }
}
