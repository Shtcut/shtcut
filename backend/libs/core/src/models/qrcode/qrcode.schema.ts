import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { QrCodeProps } from 'shtcut/core';

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
    type: Types.ObjectId,
    ref: 'User',
  })
  user: any;

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

const QrCodeSchema = SchemaFactory.createForClass(QrCode);

QrCodeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

QrCodeSchema.statics.config = () => {
  return {
    idToken: 'qr',
    uniques: ['link', 'domain', 'workspace'],
    fillables: ['workspace', 'link', 'scanned', 'domain', 'properties', 'enableTracking', 'archived'],
    updateFillables: ['workspace', 'link', 'scanned', 'domain', 'imageFormat', 'archived'],
    hiddenFields: ['deleted'],
  };
};

export { QrCodeSchema };
