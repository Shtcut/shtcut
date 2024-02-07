import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IpAddressInfo, Utils } from 'shtcut/core';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IpService {
  constructor(
    protected httpService: HttpService,
    protected config: ConfigService,
  ) {}

  public async getRemoteIp() {
    const response = await firstValueFrom(this.httpService.get('https://api.ipify.org?format=json'));
    return response.data;
  }

  public async getClientIpInfo(req: Request) {
    const { ip } = await this.getRemoteIp();

    const ipRegistryKey = this.config.get('app.ipregistry.apiKey');
    const { IpregistryClient } = require('@ipregistry/client');

    const client = new IpregistryClient(ipRegistryKey);
    const parser = require('ua-parser-js');
    const parsedUserAgent = parser(req.headers['user-agent']);

    const { data } = await client.lookup('23.81.209.173');
    const { browser, os: OS } = parsedUserAgent;

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
}
