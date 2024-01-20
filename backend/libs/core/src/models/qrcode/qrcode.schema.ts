import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FileTypeOption } from 'shtcut/core';

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

  @Prop({
    type: String,
  })
  color: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Media',
  })
  logo: any;

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
    idToken: 'media',
    uniques: [],
    fillables: ['file', 'user'],
    hiddenFields: ['deleted'],
  };
};

export { QrCodeSchema };
