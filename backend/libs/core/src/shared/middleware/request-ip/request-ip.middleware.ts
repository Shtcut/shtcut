import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { getClientIp } from 'request-ip';
import { ClientInfo, ExternalIpService, IpAddressInfo, Request, Utils } from 'shtcut/core';
import userAgent from 'useragent';
import * as geoip from 'geoip-lite';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RequestIpMiddleware implements NestMiddleware {
  constructor(protected config: ConfigService) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    const clientIp = await this.getClientIp(req);
    res.setHeader('X-Request-Ip', clientIp);

    const ipRegistryKey = this.config.get('app.ipregistry.apiKey');
    const { IpregistryClient } = require('@ipregistry/client');

    const client = new IpregistryClient(ipRegistryKey);
    const parser = require('ua-parser-js');
    const parsedUserAgent = parser(req.headers['user-agent']);

    const { data } = await client.lookup(clientIp);
    const { browser, os: OS } = parsedUserAgent;

    console.log('data:', data);

    const clientInfo: IpAddressInfo = {
      type: data?.company?.name,
      isp: data?.connection.organization,
      browser,
      OS,
      timezone: {
        name: data?.time_zone?.name,
        offset: data?.time_zone?.offset,
        zoneId: data?.time_zone?.id,
        zoneAbbreviation: data?.time_zone?.abbreviation,
        currentTime: data?.time_zone?.current_time,
      },
      country: {
        name: data?.location?.country?.name,
        code: data?.location?.country?.code,
        continentName: data?.location?.country?.code,
        continentCode: data?.location?.country?.code,
      },
      location: {
        name: data?.location?.region?.name,
        city: data?.location?.city,
        postal: data?.location?.postal,
      },
      region: {
        name: data?.location.region?.name,
        code: data?.location.region?.code,
      },
    };
    req.clientInfo = clientInfo;
    return next();
  }

  private async getClientIp(req: Request) {
    const clientIp = getClientIp(req);
    if (Utils.isLocalAddress(clientIp)) return ExternalIpService.getRemoteIp();
    return clientIp;
  }
}
