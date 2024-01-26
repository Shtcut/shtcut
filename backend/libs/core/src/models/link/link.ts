import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types, Schema as MGSchema } from 'mongoose';
import { Dict } from 'shtcut/core';

export type LinkDocument = Link & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Link {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  alias: string;

  @Prop({
    type: String,
    required: true,
  })
  target: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  user: any;

  @Prop({
    type: MGSchema.Types.ObjectId,
    ref: 'Workspace',
  })
  workspace: any;

  @Prop({
    type: MGSchema.Types.ObjectId,
    ref: 'Domain',
  })
  domain: any;

  @Prop({
    type: String,
  })
  domainName: any;

  @Prop({
    type: String,
  })
  shortUrl: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  enableTracking: boolean;

  @Prop({
    type: String,
    required: false,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
  })
  comments: string;

  @Prop({
    type: Date,
  })
  expiryDate: Date;

  @Prop({
    type: MGSchema.Types.ObjectId,
    ref: 'QrCode',
  })
  qrCode: any;

  @Prop({
    type: [
      {
        type: MGSchema.Types.ObjectId,
        ref: 'Label',
      },
    ],
  })
  label: any;

  @Prop(
    raw({
      source: String,
      medium: String,
      campaign: String,
      term: String,
      content: String,
    }),
  )
  utmParams: {
    source: string;
    medium: string;
    campaign: string;
    term: string;
    content: string;
  };

  @Prop(
    raw({
      android: String,
      ios: String,
    }),
  )
  devices: {
    android: string;
    ios: string;
  };

  @Prop({
    type: MGSchema.Types.Mixed,
  })
  geo: Dict;

  @Prop({
    type: Boolean,
    default: false,
  })
  proxy: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isPrivate: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  clicks: number;

  @Prop({
    type: Date,
  })
  latestClicked: Date;

  @Prop({
    type: Boolean,
    default: false,
  })
  archived: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  deleted: boolean;
}

const LinkSchema = SchemaFactory.createForClass(Link);

LinkSchema.statics.searchQuery = (q: string) => {
  const regex = new RegExp(q);
  return [
    { title: { $regex: regex, $options: 'i' } },
    { description: { $regex: regex, $options: 'i' } },
    { target: { $regex: regex, $options: 'i' } },
    { alias: { $regex: regex, $options: 'i' } },
  ];
};

LinkSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

LinkSchema.statics.config = () => {
  return {
    idToken: 'lnk',
    uniques: ['alias'],
    cacheKeys: ['_id', 'target'],
    fillables: [
      'alias',
      'target',
      'user',
      'title',
      'labels',
      'workspace',
      'domain',
      'domainName',
      'qrCode',
      'archive',
      'description',
      'expiryDate',
      'enableTracking',
      'password',
    ],
    updateFillables: ['target', 'archive', 'labels', 'title', 'description', 'expiryDate'],
    hiddenFields: ['deleted', 'password'],
    objectIds: ['qrCode', 'labels', 'domain'],
  };
};

export { LinkSchema };
