import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-shtner/lang';
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

  /**
   * The function validates the creation of a domain by checking if a domain with the same slug already
   * exists and if the workspace specified exists.
   * @param obj - The `obj` parameter is an object that contains the data for creating a domain. It is
   * of type `CreateDomainDto & Dict`, which means it is a combination of the `CreateDomainDto` type
   * and the `Dict` type.
   * @returns `null` if all the validation checks pass.
   */
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

  /**
   * The function `createNewObject` creates a new domain object, adds it to a workspace, and handles
   * transactions and error handling.
   * @param {CreateDomainDto} payload - The `payload` parameter is of type `CreateDomainDto`, which is
   * an object containing the necessary data to create a new domain. It likely includes properties such
   * as `name`, which represents the name of the domain.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It is used to specify a MongoDB session for the transaction. If a session is not
   * provided, a new session is started using `this.model.startSession()`.
   * @returns the created domain object.
   */
  public async createNewObject(payload: CreateDomainDto, session?: ClientSession) {
    try {
      session = session || (await this.model.startSession());
      session.startTransaction();

      const response = await this.vercelService.addDomain(payload.name);
      if (response instanceof AppException) {
        throw response;
      }
      const { status, data } = response;

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

  /**
   * The function verifies a domain by fetching it from the cache or database, ensuring it exists, and
   * then checking if it can be verified.
   * @param {string} id - The `id` parameter is a string that represents the identifier of a domain.
   * @returns the result of the `verify` variable.
   */
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

  /**
   * The function retrieves a cached domain object using a cache key.
   * @param {string} cacheKey - The `cacheKey` parameter is a string that represents the key used to
   * retrieve a cached domain object from the cache service.
   * @returns The method `getCachedDomain` is returning the result of calling the `getAsObj` method on
   * the `cacheService` object, with the `cacheKey` parameter passed as an argument.
   */
  private async getCachedDomain(cacheKey: string) {
    return await this.cacheService?.getAsObj(cacheKey);
  }

  /**
   * The function fetches a domain from a database, caches it using a cache service, and returns the
   * domain.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * domain you want to fetch from the database. It is used to query the database and retrieve the
   * corresponding domain object.
   * @param {string} cacheKey - The `cacheKey` parameter is a string that represents the key used to
   * store the domain object in the cache. It is used to retrieve the domain object from the cache
   * later on.
   * @returns the value of the `domain` variable.
   */
  private async fetchDomainFromDatabase(id: string, cacheKey: string) {
    const domain = await this.model.findById(id);
    if (domain) {
      await this.cacheService?.set(cacheKey, domain, '1m');
    }
    return domain;
  }

  /**
   * The function ensures that a domain exists and throws an exception if it does not.
   * @param domain - The `domain` parameter is a variable that represents a domain name.
   */
  private ensureDomainExists(domain) {
    if (!domain) {
      throw AppException.NOT_FOUND(lang.get('domain').notFound);
    }
  }

  /**
   * The function ensures that a workspace exists and throws an exception if it does not.
   * @param workspace - The `workspace` parameter is the object representing a workspace.
   */
  private ensureWorkspaceExists(workspace) {
    if (!workspace) {
      throw AppException.NOT_FOUND(lang.get('workspace').notFound);
    }
  }

  /**
   * The function `canVerifyDomain` is an asynchronous function that retrieves domain information and
   * configuration using the `vercelService` and then verifies the domain using the same service.
   * @param domain - The `domain` parameter is an object that represents a domain. It likely has a
   * `name` property that specifies the name of the domain.
   * @returns The function `canVerifyDomain` returns the `data` property of the response object.
   */
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
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }
}
