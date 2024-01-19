import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as httpProxy from 'express-http-proxy';

@Injectable()
export class AdminProxyMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}
  AdminServiceProxy = (hostUrl) =>
    httpProxy(hostUrl, {
      proxyReqPathResolver: function (req) {
        return `${req.baseUrl}${req.url}`;
      },
    });
  use(req: Request, res: Response, next: NextFunction) {
    this.AdminServiceProxy(this.config.get('microServices.admin.url'))(req, res, next);
  }
}
