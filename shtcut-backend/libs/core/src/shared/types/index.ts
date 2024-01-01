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
};

export type Locations = {
  name: string;
  code: string;
  continentName: string;
  continentCode: string;
};

export type OS = {
  name: string;
  version: string;
};

export type Browser = {
  name: string;
  version: string;
};
