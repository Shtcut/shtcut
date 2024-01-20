import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Browser, Country, Locations, OS, Region, Timezone } from 'shtcut/core';

export type HitDocument = Hit & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Hit {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  public publicId: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  public user: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Link',
  })
  public link: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Campaign',
  })
  public campaign: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Domain',
  })
  public domain: any;

  @Prop({
    type: String,
  })
  public type: string;

  @Prop({
    type: String,
  })
  public isp: string;

  @Prop({
    type: {
      name: String,
      offset: String,
      zoneId: String,
      zoneAbbreviation: String,
      currentTime: Date,
    },
  })
  public timezone: Timezone;

  @Prop({
    type: {
      name: String,
      city: String,
      zoneId: String,
      postal: String,
      latitude: {
        type: Number,
        select: false,
      },
      longitude: {
        type: Number,
        select: false,
      },
      language: {
        code: String,
        name: String,
        native: String,
      },
      country: {
        name: String,
        code: String,
        continentName: String,
        continentCode: String,
      },
    },
  })
  public location: Locations;

  @Prop({
    type: {
      name: String,
      version: String,
    },
  })
  public browser: Browser;

  @Prop({
    type: {
      code: String,
      name: String,
    },
  })
  public region: Region;

  @Prop({
    type: {
      name: {
        type: String,
      },
      version: {
        version: String,
      },
    },
  })
  public OS: OS;

  @Prop({
    type: Number,
    default: 0,
  })
  public clicks: boolean;

  @Prop({
    type: Number,
    default: Date.now(),
  })
  public lastClicked: Date;

  @Prop({
    type: Boolean,
    default: true,
  })
  public active: boolean;

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  public deleted: boolean;
}

const HitSchema = SchemaFactory.createForClass(Hit);

HitSchema.statics.searchQuery = (q: string) => {
  const regex = new RegExp(q);
  return [
    { 'timezone.name': { $regex: regex, $options: 'i' } },
    { 'timezone.offset': { $regex: regex, $options: 'i' } },
    { 'timezone.zoneAbbreviation': { $regex: regex, $options: 'i' } },
    { 'location.name': { $regex: regex, $options: 'i' } },
    { 'location.city': { $regex: regex, $options: 'i' } },
    { 'location.postal': { $regex: regex, $options: 'i' } },
    { 'country.name': { $regex: regex, $options: 'i' } },
    { 'country.code': { $regex: regex, $options: 'i' } },
    { 'country.continentName': { $regex: regex, $options: 'i' } },
    { 'country.continentCode': { $regex: regex, $options: 'i' } },
    { 'browser.name': { $regex: regex, $options: 'i' } },
    { 'browser.version': { $regex: regex, $options: 'i' } },
    { 'OS.name': { $regex: regex, $options: 'i' } },
    { 'OS.version': { $regex: regex, $options: 'i' } },
  ];
};

HitSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

HitSchema.statics.config = () => {
  return {
    idToken: 'hit',
    uniques: [''],
    fillables: ['type', 'timezone', 'location', 'country', 'browser', 'OS', 'link', 'campaign', 'domain'],
    hiddenFields: ['deleted'],
  };
};

export { HitSchema };
