import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

/**
 * Builds File upload service
 */
export class FileUploadService {
  constructor(private config: ConfigService) {}

  async uploadToS3(payload, options: any = {}) {
    try {
      const bucketName = this.config.get('app.fileUpload.s3.bucket');
      const s3FileName = options.filePath ? `/${options.filePath}/${payload.name}` : `${Date.now()}-${payload.name}`;
      const s3 = new S3({
        accessKeyId: this.config.get('app.fileUpload.s3.key'),
        secretAccessKey: this.config.get('app.fileUpload.s2.secret'),
      });
      const params = {
        Bucket: bucketName,
        Key: String(s3FileName),
        Body: payload.body,
        ...options,
      };
      return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
          if (err) {
            Logger.error(err);
            reject(err.message);
          }
          resolve(data);
        });
      });
    } catch (e) {
      throw e;
    }
  }
}
