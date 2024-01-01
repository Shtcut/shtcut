import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { S3 } from 'aws-sdk';
import { Storage } from '@google-cloud/storage';
import { AppException, BAD_REQUEST } from 'shtcut/core';
import lang from 'shtcut/core/lang';

/**
 * Builds File upload service
 */
export class FileUploadService {
  constructor(private config: ConfigService) {}

  /**
   * The function uploads a file to an S3 bucket using the AWS SDK for Node.js.
   * @param payload - The `payload` parameter is an object that contains the file information to be
   * uploaded. It typically includes the following properties:
   * @param {any} options - The `options` parameter is an object that can contain additional
   * configuration options for the S3 upload. It is an optional parameter, so if no options are
   * provided, an empty object `{}` is used as the default value.
   * @returns a Promise that resolves to the data object returned by the S3 upload operation.
   */
  async uploadToS3(payload, options: any = {}) {
    try {
      const bucketName = this.config.get('worker.fileUpload.s3.bucket');
      const s3FileName = options.filePath ? `/${options.filePath}/${payload.name}` : `${Date.now()}-${payload.name}`;
      const s3 = new S3({
        accessKeyId: this.config.get('worker.fileUpload.s3.key'),
        secretAccessKey: this.config.get('worker.fileUpload.s2.secret'),
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

  /**
   * The function `uploadToGCS` uploads a file to Google Cloud Storage (GCS) and returns the public URL
   * of the uploaded file.
   * @param payload - The `payload` parameter is an object that contains the file information to be
   * uploaded. It typically includes the following properties:
   * @param {any} options - The `options` parameter is an object that can contain additional
   * configuration options for the upload process. It is an optional parameter, so if no options are
   * provided, an empty object `{}` is used as the default value.
   * @returns a Promise that resolves to the URL of the uploaded file in Google Cloud Storage (GCS).
   */
  async uploadToGCS(payload, options: any = {}) {
    try {
      const bucketName = this.config.get('worker.fileUpload.gcs.bucket');
      const storage = new Storage({
        projectId: this.config.get('worker.fileUpload.gcs.projectId'),
        keyFilename: this.config.get('worker.fileUpload.gcs.keyFile'),
        ...options,
      });
      const bucket = storage.bucket(bucketName);
      const gscFileName = options.filePath ? `/${options.filePath}/${payload.name}` : `${Date.now()}-${payload.name}`;
      const file = bucket.file(gscFileName);
      return new Promise((resolve, rejects) => {
        const stream = file.createWriteStream({
          metadata: {
            contentType: payload.contentType,
          },
        });
        stream.on('error', (err) => {
          rejects(err);
        });
        stream.on('finish', async () => {
          await file.makePublic();
          const url = this.getPublicUrl(bucketName, gscFileName);
          resolve(url);
        });
        stream.end(payload.body);
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   * The function `useAzure` uploads a file to Azure Blob Storage using the provided payload and
   * options.
   * @param payload - The `payload` parameter is an object that contains information about the file to
   * be uploaded. It typically includes properties such as `name`, which represents the name of the
   * file.
   * @param {any} options - The `options` parameter is an object that can contain additional
   * configuration options for the Azure file upload. It is an optional parameter, so if no options are
   * provided, an empty object will be used as the default value.
   * @returns a Promise that resolves to an object with the properties `fileUrl` and `res`.
   */
  async useAzure(payload, options: any = {}) {
    try {
      const sasKey = `${this.config.get('app.fileUpload.azure.sasKey')}`;
      const accountName = `${this.config.get('app.fileUpload.azure.accountName')}`;
      const containerName = `${this.config.get('app.fileUpload.azure.containerName')}`;
      const connectionString = `${this.config.get('app.fileUpload.azure.containerName')}`;
      if (sasKey && accountName && containerName && connectionString) {
        const blobClientService = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobClientService.getContainerClient(containerName);
        const azureFileName = options.filePath
          ? `/${options.filePath}/${payload.name}`
          : `${Date.now()}-${payload.name}`;
        const blockBlobClient = await containerClient.getBlockBlobClient(azureFileName);
        const fileUrl = blockBlobClient.url;
        return new Promise((resolve, reject) => {
          const bufferFile = Buffer.from(azureFileName, 'utf-8');
          blockBlobClient
            .uploadData(bufferFile)
            .then((res) => {
              return resolve({
                fileUrl,
                ...res,
              });
            })
            .catch((err) => {
              return reject(err);
            });
        });
      }
      throw new AppException(BAD_REQUEST, lang.get('error').azure);
    } catch (e) {
      throw e;
    }
  }

  getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;
}
