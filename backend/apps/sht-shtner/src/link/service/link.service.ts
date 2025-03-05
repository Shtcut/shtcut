import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-shtner/lang';
import { ClientSession, Model } from 'mongoose';
import {
  AppException,
  CreateLinkDto,
  Dict,
  Domain,
  DomainDocument,
  Hit,
  HitDocument,
  HtmlMetaService,
  IpService,
  Link,
  LinkDocument,
  MongoBaseService,
  QrCode,
  QrCodeDocument,
  RedisService,
  Tag,
  TagDocument,
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
    @InjectModel(Tag.name) protected tagModel: Model<TagDocument>,
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

      let workspace = null;
      if (obj.workspace) {
        workspace = await this.workspaceModel.findOne({
          id: workspace,
          deleted: false,
        });
      }

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

      if (!obj.metadata) {
        const urlMetadata = (await this.urlMetadata(obj.target)) as any;
        if (urlMetadata) {
          const { meta, og, images } = urlMetadata || {};
          obj.metadata = { ...meta, ...og, images };
        }
      }
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

      // Associate QR code and tags with link and save link
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

  /**
   * The `duplicateObject` function duplicates an object in a TypeScript application.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * object that you want to duplicate.
   * @param {ClientSession} [session] - The `session` parameter in the `duplicateObject` function is an
   * optional parameter of type `ClientSession`. It allows you to pass a MongoDB client session to the
   * function if needed for database operations within a transaction. If a session is provided, the
   * function will use it for the database operations; otherwise
   * @returns The `duplicateObject` function returns a Promise that resolves to the result of creating
   * a new object based on the object retrieved by the provided `id`. If the object with the given `id`
   * is not found, it returns an AppException with a message "Link not found".
   */
  public async duplicateObject(id: string, session?: ClientSession): Promise<any> {
    try {
      const link = await this.model.findById(id);
      if (!link) {
        return AppException.NOT_FOUND('Link not found');
      }
      const obj = { ..._.omit(link.toJSON(), ['_id', 'id', 'publicId', 'slug', 'createdAt', 'updatedAt', 'alias']) };
      return await this.createNewObject(obj as any, session);
    } catch (e) {
      throw e;
    }
  }

  /**
   * This TypeScript function retrieves metadata from a given URL asynchronously.
   * @param {string} url - The `url` parameter is a string that represents the URL for which you want
   * to retrieve metadata.
   * @returns The function `urlMetadata` is returning the metadata fetched from the provided URL using
   * the `htmlMetaService.getMetadata` method.
   */
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

  public async updateObject(id: string, obj: Dict, session?: ClientSession) {
    try {
      const toFill: string[] = this.entity.config.updateFillables;
      obj = toFill && toFill.length > 0 ? _.pick(obj, ...toFill) : { ...obj };
      const condition = Utils.isObjectId(id) ? { _id: id } : { publicId: id };
      return await this.model.findOneAndUpdate(
        { ...condition },
        {
          $setOnInsert: {
            publicId: Utils.generateUniqueId(this.defaultConfig.idToken),
          },
          ..._.omit(obj, ['tags']),
          tags: obj?.tags?.map((t) => Utils.toObjectId(t)) || [],
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
          session: session ? session : null,
        },
      );
    } catch (e) {
      throw e;
    }
  }

  public async linkPassword(req, alias: string, password: string) {
    try {
      const link = await this.model.findOne({ alias }).select('+password').populate(['domain']);
      if (!link) {
        throw AppException.NOT_FOUND(lang.get('link').notFound);
      }
      const hashedPassword = await bcrypt.compare(password, link.password);
      if (!hashedPassword) {
        throw AppException.UNAUTHORIZED(lang.get('link').invalidPassword);
      }
      return this.visit(req, link.domain.name, alias);
    } catch (e) {
      throw e;
    }
  }

  public async visit(req: Request, domainName: string, alias: string) {
    try {
      const slug = Utils.slugifyText(domainName);
      const domain = await this.domainModel.findOne({ ...Utils.conditionWithDelete({ slug }) });
      this.ensureDomainExists(domain);

      const link = await this.model.findOne({ alias, domain: domain._id }).populate(['domain']);
      if (!link) {
        return null;
      }

      const ipAddressInfo = await this.ipService.getClientIpInfo(req);

      // If tracking is enabled, update hit information
      if (link.user) {
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
            $set: {
              publicId: Utils.generateUniqueId('hit'),
            },
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

  public async analytic(linkId) {
    try {
      const link = await this.model.findOne({ _id: linkId }).populate(['domain']);
    } catch (e) { }
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

  async deleteMany(payload: { ids: string[] }): Promise<string[]> {
    let session: ClientSession;
    try {
      session = await this.model.startSession();
      session.startTransaction();

      const { ids } = payload;
      const deleted = [];

      if (ids?.length) {
        const links = await this.model.find({
          ...Utils.conditionWithDelete({ _id: { $in: ids } }),
          deleted: false
        });

        for (let link of links) {
          _.extend(link, {
            deleted: true,
            deletedAt: new Date()
          });
          await link.save({ session });
          // Delete associated QR code
          await this.qrCodeModel.updateOne(
            { ...Utils.conditionWithDelete({ link: link._id }) },
            { deleted: true, deletedAt: new Date() },
            { session }
          );
          deleted.push(link._id);
        }
      }

      await session.commitTransaction();
      return deleted;
    } catch (error) {
      await session?.abortTransaction();
      throw error;
    } finally {
      await session?.endSession();
    }
  }

  async toggleArchiveMany(payload: { ids: string[] }): Promise<string[]> {
    let session: ClientSession;
    try {
      session = await this.model.startSession();
      session.startTransaction();

      const { ids } = payload;
      const toggledIds = [];

      if (ids?.length) {
        const links = await this.model.find({
          ...Utils.conditionWithDelete({ _id: { $in: ids } })
        });

        for (let link of links) {
          _.extend(link, { archived: !link.archived });
          await link.save({ session });

          await this.qrCodeModel.updateOne(
            { ...Utils.conditionWithDelete({ link: link._id }) },
            { archived: !link.archived },
            { session }
          );
          toggledIds.push(link._id);

          if (this.cacheService) {
            await this.cacheService.remove(this.modelName + ':' + link._id.toString());
          }
        }

        if (this.cacheService) {
          await this.cacheService.remove(this.modelName + ':list');
        }
      }

      await session.commitTransaction();
      return toggledIds;
    } catch (error) {
      await session?.abortTransaction();
      throw error;
    } finally {
      await session?.endSession();
    }
  }

}
