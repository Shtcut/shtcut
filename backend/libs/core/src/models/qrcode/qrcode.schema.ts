import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types, Schema as MG } from 'mongoose';
import { Dict, QrCodeProps } from 'shtcut/core';

export type QrCodeDocument = QrCode & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class QrCode {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

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
  slug: string;

  @Prop({
    type: String,
    default: 'link',
  })
  type: string;

  @Prop({
    type: MG.Types.Mixed,
  })
  contacts: Dict;

  @Prop({
    type: MG.Types.Mixed,
  })
  qrCode: Dict;

  @Prop({
    type: MG.Types.Mixed,
  })
  template: Dict;

  @Prop({
    type: MG.Types.Mixed,
  })
  company: Dict;

  @Prop({
    type: MG.Types.Mixed,
  })
  socialMedia: Dict;

  @Prop({
    type: MG.Types.Mixed,
  })
  address: Dict;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  user: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Media',
  })
  pdf: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Workspace',
  })
  workspace: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Domain',
  })
  domain: any;

  @Prop({
    type: Number,
    default: 0,
  })
  totalScanned: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'Link',
  })
  link: any;

  @Prop({
    type: MG.Types.Mixed,
  })
  links: any;

  @Prop({
    type: Boolean,
    default: false,
  })
  enableTracking: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  scanned: boolean;

  @Prop({
    type: String,
  })
  imageFormat: string;

  @Prop({
    type: String,
  })
  bgColor: string;

  @Prop({
    type: String,
  })
  url: string;

  @Prop({
    type: String,
  })
  profileImage: string;

  @Prop({
    type: Object,
  })
  properties: QrCodeProps;

  @Prop({
    type: Boolean,
    default: false,
  })
  archived: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isSlugAvailable: boolean;

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

  @Prop({
    type: String,
  })
  file: string;
}

const QrCodeSchema = SchemaFactory.createForClass(QrCode);

QrCodeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

QrCodeSchema.statics.config = () => {
  return {
    idToken: 'qr',
    uniques: ['title', 'slug'],
    slugify: 'title',
    fillables: [
      'workspace',
      'link',
      'type',
      'slug',
      'scanned',
      'qrCode',
      'description',
      'company',
      'address',
      'contacts',
      'links',
      'socialMedia',
      'title',
      'template',
      'user',
      'bgColor',
      'profileImage',
      'domain',
      'url',
      'properties',
      'enableTracking',
      'archived',
      'isSlugAvailable',
      'file',
    ],
    updateFillables: [
      'workspace',
      'link',
      'scanned',
      'slug',
      'type',
      'description',
      'links',
      'company',
      'isSlugAvailable',
      'qrCode',
      'socialMedia',
      'contacts',
      'bgColor',
      'title',
      'profileImage',
      'url',
      'template',
      'user',
      'domain',
      'archived',
      'file',
      'address',

    ],
    hiddenFields: ['deleted'],
  };
};

export { QrCodeSchema };
