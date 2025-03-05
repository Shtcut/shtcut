import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import lang from 'apps/sht-shtner/lang';
import { ClientSession, Model } from 'mongoose';
import {
  AppException,
  Dict,
  Hit,
  HitDocument,
  IpService,
  Link,
  LinkDocument,
  MongoBaseService,
  QrCode,
  QrCodeDocument,
  RedisService,
  Utils,
  QRCodeType,
  CreateQrCodeDto,
  PDFQRCodeDto,
  VCardQRCodeDto,
  WebsiteQRCodeDto,
  MultiLinkQRCodeDto
} from 'shtcut/core';

import { HitService } from '../../hit';
import * as _ from 'lodash';
import { Request } from 'express';

@Injectable()
export class QrCodeService extends MongoBaseService {
  protected lang = lang;

  constructor(
    @InjectModel(QrCode.name) protected model: Model<QrCodeDocument>,
    @InjectModel(Hit.name) protected hitModel: Model<HitDocument>,
    @InjectModel(Link.name) protected linkModel: Model<LinkDocument>,
    protected hitService: HitService,
    protected ipService: IpService,
    protected redisService: RedisService,
  ) {
    super(model, redisService);
  }

  public async validateCreate(obj: Dict): Promise<any> {
    try {
      // Check if type exists, is not empty, and is valid
      if (!obj.type || obj.type.trim() === '' || !Object.values(QRCodeType).includes(obj.type)) {
        throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.typeRequired);
      }

      // Common validations for all types
      if (!obj.title) {
        throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.titleRequired);
      }

      if (!obj.qrCode) {
        throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.qrCodeRequired);
      }

      // Type-specific validations
      switch (obj.type) {
        case QRCodeType.WEBSITE:
          if (!obj.url) {
            throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.urlRequired);
          }
          break;
        case QRCodeType.PDF:
          if (!obj.file) {
            throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.pdfRequired);
          }
          break;
        case QRCodeType.VCARD:
          if (!obj.company?.name) {
            throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.companyRequired);
          }
          if (!obj.contacts?.email || !obj.contacts?.phone) {
            throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.contactsRequired);
          }
          if (!obj.address?.street || !obj.address?.city || !obj.address?.country) {
            throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.addressRequired);
          }
          break;
        case QRCodeType.MULTI_LINK:
          if (!obj.links || !Array.isArray(obj.links) || obj.links.length === 0) {
            throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.linksRequired);
          }
          // Validate each link
          for (const link of obj.links) {
            if (!link.url || !link.label || link.label.trim() === '') {
              throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.linkDetailsRequired);
            }
          }
          break;
        default:
          throw AppException.BAD_REQUEST(lang.get('qrcodes').invalidType);
      }

      // Check for duplicate title within user's scope
      const slug = Utils.slugifyText(obj.title);
      const existingQrCode = await this.model.findOne({
        ...Utils.conditionWithDelete({
          $or: [
            { title: obj.title },
            { slug: slug }
          ],
          user: obj.user
        })
      });

      if (existingQrCode) {
        throw AppException.CONFLICT(lang.get('qrcodes').duplicate);
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  public async prepareBodyObject(req: Request): Promise<any> {
    const payload = req.body;
    if (payload && payload.title) {
      payload.slug = Utils.slugifyText(payload.title);
    }
    return payload;
  }

  public async createNewObject(obj: Dict, session?: ClientSession): Promise<any> {
    try {
      if (obj.type) {
        const { type } = obj;
        let qrContent: string;

        // Common fields for all types
        const createObj: any = {
          target: '',
          title: obj.title,
          type: type,
          bgColor: obj.bgColor,
          qrCode: obj.qrCode,
          description: obj.description,
          profileImage: obj.profileImage,
          template: obj.template,
          slug: Utils.slugifyText(obj.title),
          isSlugAvailable: true,
        };

        // Add type-specific fields
        switch (type) {
          case QRCodeType.WEBSITE:
            qrContent = this.generateWebsiteQRContent(obj as WebsiteQRCodeDto);
            createObj.url = obj.url;
            break;
          case QRCodeType.PDF:
            qrContent = this.generatePDFQRContent(obj as PDFQRCodeDto);
            createObj.file = obj.file;
            if (obj.description) createObj.description = obj.description;
            if (obj.profileImage) createObj.profileImage = obj.profileImage;
            break;
          case QRCodeType.VCARD:
            qrContent = this.generateVCardQRContent(obj as VCardQRCodeDto);
            createObj.address = obj.address;
            createObj.company = obj.company;
            createObj.contacts = obj.contacts;
            createObj.socialMedia = obj.socialMedia;
            break;
          case QRCodeType.MULTI_LINK:
            qrContent = this.generateMultiLinkQRContent(obj as MultiLinkQRCodeDto);
            createObj.links = obj.links;
            createObj.socialMedia = obj.socialMedia;
            break;
          default:
            throw AppException.BAD_REQUEST(lang.get('qrcodes').invalidType);
        }

        createObj.target = qrContent;
        return super.createNewObject(createObj, session);
      }
      return super.createNewObject(obj, session);
    } catch (error) {
      throw error;
    }
  }

  public updateObject(id: string, obj: Dict, session?: ClientSession) {
    if (obj.title) obj.slug = Utils.slugifyText(obj.title);
    return super.updateObject(id, obj, session);
  }

  public async visit(req: Request, id: string) {
    try {
      const qrCode = await this.model.findOne({ ...Utils.conditionWithDelete({ _id: id }) });
      if (!qrCode) {
        return null;
      }

      const ipAddressInfo = await this.ipService.getClientIpInfo(req);

      if (qrCode.enableTracking) {
        const payload = {
          user: qrCode.user,
          ...ipAddressInfo,
        };

        await this.hitModel.findOneAndUpdate(
          { qrcode: qrCode._id },
          {
            ...payload,
            lastClicked: payload.timezone.currentTime ?? Date.now(),
            $inc: { clicks: 1 },
          },
          {
            ...Utils.mongoDefaultUpdateProps(),
          },
        );
      }

      // Increment click count and save qrcode
      qrCode.totalScanned += 1;
      return await qrCode.save();
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
      const [qrCode, _] = await Promise.all([
        await this.model.deleteOne({ ...Utils.conditionWithDelete({ _id: id }) }, { session }),
        await this.linkModel.deleteOne({ ...Utils.conditionWithDelete({ qrCode: id }) }, { session }),
      ]);
      await session?.commitTransaction();
      return qrCode;
    } catch (e) {
      await session?.abortTransaction();
      throw e;
    } finally {
      await session?.endSession();
    }
  }

  public async bulkDelete(ids: string[]) {
    let session: ClientSession;
    try {
      session = await this.model.startSession();
      session.startTransaction();

      if (!ids?.length) {
        throw AppException.BAD_REQUEST(lang.get('qrcodes').validation.idsRequired);
      }

      const qrCodes = await this.model.find({
        ...Utils.conditionWithDelete({ _id: { $in: ids } }),
        deleted: false
      });

      if (!qrCodes.length) {
        throw AppException.NOT_FOUND(lang.get('qrcodes').notFound);
      }

      const deleted = [];
      for (let qrCode of qrCodes) {
        _.extend(qrCode, {
          deleted: true,
          deletedAt: new Date()
        });
        await qrCode.save({ session });

        // Delete associated link
        await this.linkModel.updateOne(
          { ...Utils.conditionWithDelete({ qrCode: qrCode._id }) },
          { deleted: true, deletedAt: new Date() },
          { session }
        );

        deleted.push(qrCode._id);

        // Clear cache
        if (this.cacheService) {
          await this.cacheService.remove(this.modelName + ':' + qrCode._id.toString());
        }
      }

      // Clear list cache
      if (this.cacheService) {
        await this.cacheService.remove(this.modelName + ':list');
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

  private generatePDFQRContent(data: PDFQRCodeDto): string {
    // Generate content for PDF QR code
    return `PDF:${data.file}`;
  }

  private generateVCardQRContent(data: VCardQRCodeDto): string {
    // Generate vCard format string
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.title}`,
      `ORG:${data.company.name}`,
      `TITLE:${data.company.department}`,
      `EMAIL:${data.contacts.email}`,
      `TEL:${data.contacts.phone}`,
      `ADR:;;${data.address.street};${data.address.city};${data.address.state};${data.address.zipCode};${data.address.country}`,
      `URL:${data.contacts.website || ''}`,
      'END:VCARD'
    ].join('\n');
    return vcard;
  }

  private generateWebsiteQRContent(data: WebsiteQRCodeDto): string {
    return data.url;
  }

  private generateMultiLinkQRContent(data: MultiLinkQRCodeDto): string {
    // Create a JSON structure or formatted string for multiple links
    const content = {
      links: data.links,
      social: data.socialMedia
    };
    return JSON.stringify(content);
  }

  public async postCreate(data: { queryParser: any; value: any; code: number; message?: string }) {
    return {
      code: data.code,
      value: data.value,
      message: data.message ?? lang.get('qrcodes').created
    };
  }
}
