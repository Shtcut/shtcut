import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import lang from 'apps/sht-gw/lang';
import * as bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import * as httpProxy from 'express-http-proxy';
import { AppException } from 'shtcut/core';

@Injectable()
export class WorkerProxyMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}

  ServiceProxy = (hostUrl: string) =>
    httpProxy(hostUrl, {
      proxyReqPathResolver: function (req) {
        return `${req.baseUrl}${req.url}`;
      },
      proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        if (srcReq.headers['content-type'] && srcReq.headers['content-type'].startsWith('multipart/form-data')) {
          proxyReqOpts.headers['content-type'] = srcReq.headers['content-type'];
        }
        return proxyReqOpts;
      },
    });

  use(req: Request, res: Response, next: NextFunction) {
    bodyParser.raw({
      type: 'multipart/form-data',
      limit: '50mb',
    })(req, res, (err) => {
      if (err) {
        throw AppException.BAD_REQUEST(lang.get('error').tooLargeFile, err.getMessage());
      }
    });
    this.ServiceProxy(this.config.get('microServices.worker.url'))(req, res, next);
  }
}
