import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as httpProxy from 'express-http-proxy';

@Injectable()
export class AclProxyMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}
  AclServiceProxy = (hostUrl) =>
    httpProxy(hostUrl, {
      proxyReqPathResolver: function (req) {
        return `${req.baseUrl}${req.url}`;
      },
    });
  use(req: Request, res: Response, next: NextFunction) {
    this.AclServiceProxy(this.config.get('microServices.acl.url'))(req, res, next);
  }
}
