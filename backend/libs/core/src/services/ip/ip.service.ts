import { Injectable } from '@nestjs/common';
import { HttpService } from '../http/http.service';
import { ConfigService } from '@nestjs/config';
import { IpAddressInfo, Utils } from 'shtcut/core';
import { Request } from 'express';

@Injectable()
export class IpService {
  private static url = 'https://api.ipify.org?format=json';

  constructor(protected config: ConfigService) {}

  public static async getRemoteIp() {
    const remoteIP = await HttpService.get<{ ip: string }>(this.url);
    return remoteIP.ip;
  }

  public async getClientIpInfo(req: Request) {
    const clientIp = await this.getClientIp(req);

    const ipRegistryKey = this.config.get('app.ipregistry.apiKey');
    const { IpregistryClient } = require('@ipregistry/client');

    const client = new IpregistryClient(ipRegistryKey);
    const parser = require('ua-parser-js');
    const parsedUserAgent = parser(req.headers['user-agent']);

    const { data } = await client.lookup(clientIp);
    const { browser, os: OS } = parsedUserAgent;

    console.log('data:', data);

    const clientInfo: IpAddressInfo = {
      ...data,
      type: data?.company?.name,
      isp: data?.connection.organization,
      ip: data?.ip,
      browser,
      OS,
      timezone: {
        name: data?.time_zone?.name,
        offset: data?.time_zone?.offset,
        zoneId: data?.time_zone?.id,
        zoneAbbreviation: data?.time_zone?.abbreviation,
        currentTime: data?.time_zone?.current_time,
      },
      location: {
        name: data?.location?.region?.name,
        city: data?.location?.city,
        postal: data?.location?.postal,
        latitude: data?.location?.latitude,
        longitude: data?.location?.latitude,
        language: data?.location?.language,
        country: {
          name: data?.location?.country?.name,
          code: data?.location?.country?.code,
          flag: data?.location?.country.flag,
          population: data?.location?.country.languages,
          continentName: data?.location?.country?.code,
          continentCode: data?.location?.country?.code,
        },
      },
      region: {
        name: data?.location.region?.name,
        code: data?.location.region?.code,
      },
    };
    return clientInfo;
  }

  private async getClientIp(req: Request) {
    const clientIp = this.getClientIp(req);
    if (Utils.isLocalAddress(clientIp)) return IpService.getRemoteIp();
    return clientIp;
  }
}
