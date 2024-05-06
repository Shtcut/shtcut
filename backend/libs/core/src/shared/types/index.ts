import { Request as ExpressRequest } from 'express';
import { ExecutionContext } from '@nestjs/common';
import { LimiterInfo } from 'ratelimiter';
import { LimiterOption } from 'ratelimiter';
import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export type Dict<T = any> = Record<string, T>;
export type Nullable<T> = T | null;
export type HttpErrorHandle<T> = (error: unknown) => T;

export type CacheKeyArgument = string | Buffer;
export type CacheValueArgument = string | Buffer;

export type GetIdFn = (context: ExecutionContext, id: string) => string | Promise<string>;
export type CreateErrorBodyFn = (limit: LimiterInfo) => unknown;
export type RateLimiterParams = Pick<LimiterOption, 'max' | 'duration'> & {
  createErrorBody?: CreateErrorBodyFn
} & ({ getId: GetIdFn } | { id: string } | {});

export type RateLimiterModuleParams = Partial<RateLimiterParams> & Pick<LimiterOption, 'db'>;

export interface RateLimiterModuleParamsAsync extends Pick<ModuleMetadata, 'imports' | 'providers'>,
  Pick<FactoryProvider<RateLimiterModuleParams | Promise<RateLimiterModuleParams>>, 'useFactory' | 'inject'> {
}

export type CacheKeyValue = {
  key: CacheKeyArgument;
  value: CacheValueArgument | CacheKeyArgument[];
};

export type RequiredField<T, K extends keyof any> = T extends Record<K, any> ? T : never;

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

export type QrCodeProps = {
  value: string;
  bgColor?: string;
  patternColor?: string;
  fgColor?: string;
  logoImage?: string;
  eye_color_2_outer?: string;
  eye_color_0_outer?: string;
  eye_color_0_inner?: string;
  eye_color1_inner?: string;
  eye_color_2_Inner?: string;
  logoPadding?: string;
  logoWidth?: string;
  qrStyle?: string;
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
  ip: string;
  browser: Dict;
  OS: Dict;
  company: {
    domain: string | undefined;
    name: string | undefined;
    type: string | undefined;
  };
  timezone: {
    name: string | undefined;
    offset: string | number | undefined;
    zoneId: string | undefined;
    zoneAbbreviation: string | undefined;
    currentTime: string | undefined;
  };
  currency: {
    code: string | undefined;
    name: string | undefined;
    symbol: string | undefined;
  };
  location: {
    name: string | undefined;
    city: string | undefined;
    postal: string | undefined;
    latitude: number | undefined;
    longitude: number | undefined;
    language: Dict<string> | undefined;
    country: {
      name: string | undefined;
      code: string | undefined;
      flag: string[] | undefined;
      population: number | undefined;
      continentName: string | undefined;
      continentCode: string | undefined;
    };
  };
  region: {
    name: string | undefined;
    code: string | undefined;
  };
};

interface Image {
  src: string;
}

export type Request<T = unknown> = {
  clientInfo: IpAddressInfo;
} & ExpressRequest<T>;

export type HtmlMetadata = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  site_name?: string;
};

export interface HtmlMetadataResult {
  images: Array<Image>;
  meta: {
    description?: string;
    title?: string;
  };
  og: {
    image?: string;
    description?: string;
    title?: string;
    images?: Array<Image>;
    site_name?: string;
    type?: string;
    url?: string;
    videos?: Array<Image>;
  };
}

export type RateLimitFramework = 'Express' | 'Fastify' | 'Microservice' | 'ExpressGraphql' | 'FastifyGraphql';

interface IRedis {
  host: string;
  port: number;
}

export interface RateLimiterOptions {
  framework: RateLimitFramework;
  redis?: IRedis;
  keyPrefix: string;
  points: number;
  duration: number;
  errorMessage?: string;
  logger?: boolean;
}

export interface IRateLimiterResponse {
  remainingPoints: number;
  points: number;
  beforeNext: number;
}
