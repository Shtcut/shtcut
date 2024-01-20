import { Request as ExpressRequest } from 'express';

export type Dict<T = any> = Record<string, T>;
export type Nullable<T> = T | null;
export type HttpErrorHandle<T> = (error: unknown) => T;

export type Country = {
  name: string;
  code: string;
  continentName: string;
};

export type Timezone = {
  name: string;
  offset: number;
  zoneId: string;
  zoneAbbreviation: string;
  currentTime: Date;
};

export type Locations = {
  name: string;
  code: string;
  country: Country;
};

export type OS = {
  name: string;
  version: string;
};

export type Browser = {
  name: string;
  version: string;
};

export type Region = {
  name: string;
  code: string;
};

export type HitType = {
  ip: string;
  link: string;
  userAgent: string;
  owner?: string;
};

export type IpInfo = {
  city: string;
  region: string;
  country: string;
  timezone: string;
};

export type ClientInfo = {
  ip: string;
  browser: string;
  os: string;
  agent: string;
  ipInfo: Nullable<IpInfo>;
};

export type IpAddressInfo = {
  type: string;
  isp: string;
  browser: Dict;
  OS: Dict;
  timezone: {
    name: string | undefined;
    offset: string | number | undefined;
    zoneId: string | undefined;
    zoneAbbreviation: string | undefined;
    currentTime: string | undefined;
  };
  country: {
    name: string | undefined;
    code: string | undefined;
    continentName: string | undefined;
    continentCode: string | undefined;
  };
  location: {
    name: string | undefined;
    city: string | undefined;
    postal: string | undefined;
  };
  region: {
    name: string | undefined;
    code: string | undefined;
  };
};

export type Request<T = unknown> = {
  clientInfo: IpAddressInfo;
} & ExpressRequest<T>;
