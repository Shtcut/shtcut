import { configuration } from '@config';
import { HttpService } from '@nestjs/axios';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import lang from 'apps/sht-gw/lang';
import { NextFunction, Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { AppException } from 'shtcut/core';

@Injectable()
export class ApiMiddleware implements NestMiddleware {
  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // check header or url parameters or post parameters for token
    const apiVersions = configuration().app.api.versions ?? ['v1'];
    const currentVersion = apiVersions.pop();
    const excludeUrls = [
      `/api/${currentVersion}/endpoint/ip`,
      `/api/${currentVersion}/ping`,
      `/api/${currentVersion}/graphql`,
      `/api/${currentVersion}/links/visit`,
      `/api/${currentVersion}/visit/*`,
    ];
    if (excludeUrls.includes(req.originalUrl)) {
      return next();
    }
    const apiKey = req.query.apiKey || req.headers['x-api-key'];
    if (!apiKey) {
      return next(AppException.UNAUTHORIZED(lang.get('error').noApiKey));
    }
    if (apiKey === process.env.API_KEY) {
      return next();
    }
    req.header['x-api-key'] = process.env.API_KEY;
    next();
  }
}
