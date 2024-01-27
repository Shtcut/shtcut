import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession } from 'mongodb';
import { Model } from 'mongoose';
import { FileUploadEnum, FileUploadService, Media, MongoBaseService, Utils } from 'shtcut/core';

@Injectable()
export class MediaService extends MongoBaseService {
  constructor(
    @InjectModel(Media.name) protected model: Model<Media>,
    private fileService: FileUploadService,
    protected config: ConfigService,
  ) {
    super(model);
  }

  /**
   * The function creates a new object with a unique publicId and saves it.
   * @param obj - The `obj` parameter is an object that contains key-value pairs representing the
   * properties of the new object that you want to create. The `any` type indicates that the values can
   * be of any type.
   * @param {ClientSession} [session] - The `session` parameter is an optional parameter of type
   * `ClientSession`. It is used to specify a session for the database operation. A session allows you
   * to group multiple operations into a single transaction, ensuring atomicity and consistency. If a
   * session is provided, the database operation will be executed within that
   * @returns a promise that resolves to the newly created object.
   */
  public async createNewObject(obj: Record<string, any>, session?: ClientSession) {
    return new this.model({
      ...obj,
      publicId: Utils.generateUniqueId('media'),
    }).save();
  }

  public async upload(uploaded: Record<string, any>) {
    try {
      const ext = uploaded.mimetype.split('/');
      const data = {
        body: uploaded.buffer,
        name: `${uploaded.fieldname}`,
      };
      if (ext && ext.length > 1) {
        data['name'] = `${data.name}.${ext.pop()}`;
      }
      let url;
      const uploadDefault = this.config.get<string>('worker.fileUpload.default');
      switch (uploadDefault) {
        case FileUploadEnum.AWS_S3:
          const uploadedFile = await this.fileService.uploadToS3(data);
          url = uploadedFile['Location'];
          break;
        case FileUploadEnum.GCS:
          url = await this.fileService.uploadToGCS(data);
          break;
        case FileUploadEnum.AZURE:
          url = await this.fileService.useAzure(data);
          break;
        default:
          break;
      }
      const payload = {
        file: {
          name: uploaded.originalname,
          url,
          fileType: uploaded.mimetype,
        },
        ...uploaded,
      };
      return await this.createNewObject({
        ...payload,
      });
    } catch (e) {
      throw e;
    }
  }
}
