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
