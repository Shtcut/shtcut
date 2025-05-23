import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Limits } from 'busboy';
import { Observable } from 'rxjs';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';
import * as Busboy from 'busboy';
import * as _ from 'lodash';
import { AppException } from '../../exceptions';
import lang from 'shtcut/core/lang';

type FileInterceptorOptions = {
  limits?: Limits;
};

@Injectable()
export class FileInterceptor implements NestInterceptor {
  constructor(
    private fieldName: string,
    private maxCount = 1,
    private options: FileInterceptorOptions = {},
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    return new Promise((resolve, reject) => {
      const busboy = Busboy({
        headers: request.headers,
        // 10mb by defaults
        limits: this.options.limits ?? { fileSize: 1024 * 1024 * 100 },
      });
      const fields: { [x: string]: string } = {};
      const files: (Partial<any> & { id?: string })[] = [];
      let count = 0;

      busboy.on(
        'file',
        (name: string, file: Readable, information: { filename: string; encoding: string; mimeType: string }): void => {
          const id = randomUUID();
          if (name !== this.fieldName) {
            file.resume();
            return;
          }
          if (!_.isUndefined(this.maxCount) && count++ >= this.maxCount) {
            file.resume();
            throw AppException.BAD_REQUEST(lang.get('file').tooMany);
          }
          file.on('data', (data) => {
            const file = files.find((f: any) => f.id === id);
            if (file) {
              file.buffer = Buffer.concat([file.buffer, data]);
              file.size = (file.size as number) + data.length;
            } else {
              files.push({
                id,
                fieldname: name,
                originalname: information.filename,
                encoding: information.encoding,
                mimetype: information.mimeType,
                size: data.length,
                buffer: data,
              });
            }
          });
        },
      );
      busboy.on('field', (name, value) => {
        fields[name] = value;
      });

      busboy.on('finish', () => {
        request.body = fields;
        const data = files.map((file) => {
          delete file.id;
          return file;
        });
        request.files = data;

        resolve(next.handle());
      });

      busboy.on('error', (err) => {
        reject(err);
      });

      if (request.rawBody) busboy.end(request.rawBody);
      else request.pipe(busboy);
    });
  }
}
