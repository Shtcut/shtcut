import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-shtner/lang';
import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';
import {
  AppException,
  CreateLinkDto,
  Dict,
  Domain,
  DomainDocument,
  Hit,
  HitDocument,
  HtmlMetaService,
  IpAddressInfo,
  IpService,
  Link,
  LinkDocument,
  MongoBaseService,
  QrCode,
  QrCodeDocument,
  RedisService,
  User,
  UserDocument,
  Utils,
  Workspace,
  WorkspaceDocument,
} from 'shtcut/core';

import * as bcrypt from 'bcrypt';
import { HitService } from '../../hit';
import * as _ from 'lodash';
import { Request } from 'express';

@Injectable()
export class LinkService extends MongoBaseService {
  constructor(
    @InjectModel(Link.name) protected model: Model<LinkDocument>,
    @InjectModel(User.name) protected userModel: Model<UserDocument>,
    @InjectModel(Workspace.name) protected workspaceModel: Model<WorkspaceDocument>,
    @InjectModel(Domain.name) protected domainModel: Model<DomainDocument>,
    @InjectModel(Hit.name) protected hitModel: Model<HitDocument>,
    @InjectModel(QrCode.name) protected qrCodeModel: Model<QrCodeDocument>,
    protected hitService: HitService,
    protected htmlMetaService: HtmlMetaService,
    protected ipService: IpService,
    protected redisService: RedisService,
  ) {
    super(model, redisService);
    this.routes = {
      create: true,
      find: true,
      findOne: true,
      update: true,
      patch: true,
      remove: true,
    };
  }

  /**
   * The function `validateCreate` in TypeScript validates a `CreateLinkDto` object by checking for
   * duplicate alias, existence of owner user, validity of workspace and domain, and validity of expiry
   * date.
   * @param {CreateLinkDto} obj - The `obj` parameter is an object of type `CreateLinkDto` which
   * contains the following properties:
   * @returns null.
   */
  public async validateCreate(obj: CreateLinkDto) {
    try {
      const { alias, user: owner, expiryDate, workspace, domain } = obj;
      const link = await this.model.findOne({ alias });

      // Check for duplicate alias
      if (alias && link) {
        throw AppException.CONFLICT(lang.get('link').duplicate);
      }

      // Check if the owner user exists
      if (owner) {
        const user = await this.userModel.findOne({ ...Utils.conditionWithDelete({ _id: owner }) });
        if (!user) {
          throw AppException.NOT_FOUND(lang.get('user').notFound);
        }
      }

      // Check if the workspace and domain are valid
      if (workspace) {
        const foundWorkspace = await this.workspaceModel.find({
          ...Utils.conditionWithDelete({
            workspace,
            user: owner,
            domains: { $in: domain },
          }),
        });

        if (!foundWorkspace) {
          throw AppException.NOT_FOUND(lang.get('workspace').invalidDomain);
        }
      }

      // Check if the expiry date is valid
      if (expiryDate) {
        const date = new Date(expiryDate);
        if (_.isNaN(date.getTime())) {
          throw AppException.BAD_REQUEST(lang.get('link').invalidExpiryDate);
        }
        if (new Date(expiryDate) < new Date()) {
          throw AppException.BAD_REQUEST(lang.get('link').invalidateExpiryFutureDate);
        }
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  /**
   * The function creates a new object with additional properties, including generating an alias and
   * finding an associated domain, and saves it along with an associated QR code.
   * @param obj - The `obj` parameter is an object that contains the data needed to create a new
   * object. It is of type `CreateLinkDto & Dict`, which means it should have properties defined in
   * both the `CreateLinkDto` interface and the `Dict` interface.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It is used to start a session and perform a transaction for the database
   * operations within the `createNewObject` method. The session allows for atomicity and isolation of
   * the database operations, ensuring that either all the operations within the
   * @returns the created link object.
   */
  public async createNewObject(obj: CreateLinkDto & Dict, session?: ClientSession) {
    try {
      session = await this.model.startSession();
      session.startTransaction();

      const { password, user } = obj;

      // Hash password if present
      if (password) {
        obj.password = await bcrypt.hash(obj.password, 10);
        obj.isPrivate = true;
      }

      // Generate alias and find associated domain
      if (!obj.alias) {
        obj.alias = Utils.generateCode(7, true);
      }

      const domain = await this.domainModel.findOne({ ...Utils.conditionWithDelete({ _id: obj.domain }) });
      this.ensureDomainExists(domain);

      // Check if the domain is verified
      // this.checkDomainVerification(domain);

      // Create and save associated QR code
      let link = await super.createNewObject({ ..._.omit(obj, ['qrCode']) }, session);
      const qrCode = await new this.qrCodeModel({
        properties: {
          ...obj.qrCode,
        },
        ..._.omit(obj, ['qrCode']),
        publicId: Utils.generateUniqueId('qrc'),
        user,
        link: link._id,
        workspace: obj.workspace,
        domain: domain._id,
      }).save({ session });

      // Associate QR code with link and save link
      link.qrCode = qrCode._id;
      link = await link.save({ session });

      await session?.commitTransaction();

      return link;
    } catch (e) {
      await session?.abortTransaction();
      throw e;
    } finally {
      await session?.endSession();
    }
  }

  public async urlMetadata(url: string) {
    try {
      if (!url) {
        throw AppException.BAD_REQUEST(lang.get('links').emptyUrl);
      }
      const data = await this.htmlMetaService.getMetadata(url, this.cacheService);
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async visit(req: Request, domainName: string, alias: string) {
    try {
      const slug = Utils.slugifyText(domainName);
      const domain = await this.domainModel.findOne({ ...Utils.conditionWithDelete({ slug }) });
      this.ensureDomainExists(domain);
      this.checkDomainVerification(domain);

      // Find link by alias and domain
      const link = await this.model.findOne({ alias, domain: domain._id }).populate(['domain']);
      if (!link) {
        return null;
      }

      const ipAddressInfo = await this.ipService.getClientIpInfo(req);

      // If tracking is enabled, update hit information
      if (link.enableTracking) {
        const payload = {
          user: link.user,
          link: link._id,
          domain: domain._id,
          ...ipAddressInfo,
        };

        // Update or create hit record
        await this.hitModel.findOneAndUpdate(
          { link: link._id, domain: payload.domain },
          {
            ...payload,
            lastClicked: payload.timezone.currentTime ?? Date.now(),
            domain: domain._id,
            $inc: { clicks: 1 },
          },
          {
            ...Utils.mongoDefaultUpdateProps(),
          },
        );
      }

      // Increment click count and save link
      link.clicks += 1;
      return await link.save();
    } catch (e) {
      throw e;
    }
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
   * The function checks if a domain is verified and throws an exception if it is not.
   * @param domain - The "domain" parameter is an object that represents a domain. It likely contains
   * information about the domain, such as its name, owner, and verification status.
   */
  private checkDomainVerification(domain) {
    const { verification } = domain;
    if (!verification.verified) {
      throw AppException.NOT_FOUND(lang.get('domain').notVerified);
    }
  }

  /**
   * This TypeScript function deletes an object and its associated QR code link within a transaction
   * using MongoDB sessions.
   * @param {string} id - The `id` parameter in the `deleteObject` function is a string that represents
   * the unique identifier of the object you want to delete. This identifier is used to locate and
   * delete the corresponding object from the database.
   * @returns The `deleteObject` method is returning the result of deleting the object with the
   * specified id.
   */
  public async deleteObject(id: string) {
    let session: ClientSession;
    try {
      session = await this.model.startSession();
      session.startTransaction();
      const [link, _] = await Promise.all([
        await this.model.deleteOne({ ...Utils.conditionWithDelete({ _id: id }) }, { session }),
        await this.qrCodeModel.deleteOne({ ...Utils.conditionWithDelete({ link: id }) }, { session }),
      ]);
      await session?.commitTransaction();
      return link;
    } catch (e) {
      await session?.abortTransaction();
      throw e;
    } finally {
      await session?.endSession();
    }
  }
}
