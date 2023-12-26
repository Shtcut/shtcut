import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as httpProxy from 'express-http-proxy';

@Injectable()
export class AppProxyMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}

  ServiceProxy = (hostUrl: string) =>
    httpProxy(hostUrl, {
      proxyReqPathResolver: function (req) {
        return `${req.baseUrl}${req.url}`;
      },
    });

  use(req: Request, res: Response, next: NextFunction) {
    this.ServiceProxy(this.config.get('microServices.app.url'))(req, res, next);
  }
}
