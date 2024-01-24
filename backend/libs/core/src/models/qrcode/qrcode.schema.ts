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
    ref: 'Campaign',
  })
  campaign: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Domain',
  })
  domain: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Link',
  })
  link: any;

  @Prop({
    type: Boolean,
    default: false,
  })
  scanned: boolean;

  @Prop({
    type: String,
  })
  imageFormat: string;

  @Prop(
    raw({
      value: String,
      bgColor: String,
      patternColor: String,
      fgColor: String,
      logoImage: String,
      eye_color_2_outer: String,
      eye_color_0_outer: String,
      eye_color_0_inner: String,
      eye_color1_inner: String,
      eye_color_2_Inner: String,
      logoPadding: String,
      logoWidth: String,
      qrStyle: String,
    }),
  )
  properties: QrCodeProps;

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
    uniques: ['link', 'domain', 'campaign'],
    fillables: ['campaign', 'link', 'scanned', 'domain', 'properties'],
    updateFillables: ['campaign', 'link', 'scanned', 'domain', 'imageFormat'],
    hiddenFields: ['deleted'],
  };
};

export { QrCodeSchema };
