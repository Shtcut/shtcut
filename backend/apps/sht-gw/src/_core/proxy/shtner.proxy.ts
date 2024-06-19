import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as httpProxy from 'express-http-proxy';

@Injectable()
export class ShtnerProxyMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}
  ShtnerServiceProxy = (hostUrl) =>
    httpProxy(hostUrl, {
      proxyReqPathResolver: function (req) {
        return `${req.baseUrl}${req.url}`;
      },
    });
  use(req: Request, res: Response, next: NextFunction) {
    this.ShtnerServiceProxy(this.config.get('microServices.shtner.url'))(req, res, next);
  }
}
