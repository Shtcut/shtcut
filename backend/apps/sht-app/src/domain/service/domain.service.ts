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
  RedisService,
  Utils,
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
  ) {
    super(model, cacheService);
  }

  public async validateCreate(obj: CreateDomainDto) {
    try {
      const { workspace, name } = obj;
      const slug = Utils.slugifyText(name);

      // Check if domain with the same slug exists
      const domain = await this.model.findOne({ slug });

      if (domain) {
        const { verification } = domain;

        // Check if the domain is already verified
        if (verification.verified) {
          throw AppException.NOT_FOUND(lang.get('domain').verified);
        }

        throw AppException.CONFLICT(lang.get('domain').duplicate);
      }

      // Check if the workspace exists
      const foundWorkspace = await this.workspaceModel.findOne({ _id: workspace });

      if (!foundWorkspace) {
        throw AppException.NOT_FOUND(lang.get('workspace').notFound);
      }

      return null;
    } catch (e) {
      throw e;
    }
  }

  public async createNewObject(payload: CreateDomainDto, session?: ClientSession) {
    let newSession: ClientSession | undefined;

    try {
      // If a session is not provided, start a new session
      if (!session) {
        newSession = await this.model.startSession();
        newSession.startTransaction();
      } else {
        newSession = session;
      }

      const code = Utils.generateUniqueId('shtcut-verification-site');
      const domain = await super.createNewObject({ ...payload }, newSession);

      if (domain) {
        domain.verification = {
          code,
          verified: false,
          dnsType: 'TXT',
        };
      }

      const workspace = await this.workspaceModel.findById(payload.workspace);

      if (!workspace) {
        throw AppException.NOT_FOUND(lang.get('workspace').notFound);
      }

      workspace.domains.push(domain._id);
      await Promise.all([domain.save({ session: newSession }), workspace.save({ session: newSession })]);

      if (!session) {
        // If a new session was started, commit the transaction
        await newSession.commitTransaction();
      }

      return domain;
    } catch (e) {
      // If an error occurs, abort the transaction
      if (!session) {
        await newSession?.abortTransaction();
      }

      throw e;
    } finally {
      // Always end the session, whether it was started or passed as an argument
      await newSession?.endSession();
    }
  }

  public async verifyDomain(id: string) {
    try {
      const cacheKey = `${this.modelName}-${id}`;
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

  private async canVerifyDomain(domain) {
    try {
      const txtRecords = await this.getDnsRecordsForDomain(domain.name);

      const txtSpfRecord = this.findTxtSpfRecord(txtRecords);

      if (txtSpfRecord && txtRecords.value) {
        this.verifyDomainCode(domain, txtRecords);
      }

      return {
        record: txtRecords,
        domain,
      };
    } catch (error) {
      throw AppException.INTERNAL_SERVER(lang.get('domain').verificationInprogress);
    }
  }

  private async getDnsRecordsForDomain(domainName: string) {
    return await getDnsRecords(domainName, 'TXT');
  }

  private findTxtSpfRecord(txtRecords) {
    return txtRecords.find((record) => record.value.includes('shtcut-verification-site'));
  }

  private verifyDomainCode(domain, txtRecords) {
    const { value } = txtRecords;
    const code = value.split('-')[3];

    if (code && String(code).trim() === String(domain.code).trim()) {
      this.updateDomainVerificationStatus(domain);
    }
  }

  private async updateDomainVerificationStatus(domain) {
    domain.verification = {
      code: null,
      verified: true,
      dnsType: 'TXT',
    };
    await domain.save();
  }
}
