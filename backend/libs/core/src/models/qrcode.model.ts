import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { QRCodeType } from '../shared/dto/qrcode/create-qrcode.dto';

@Schema({ timestamps: true })
export class QrCode extends Document {
  @Prop({ type: String, enum: QRCodeType, required: true })
  type: QRCodeType;

  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, required: true, unique: true })
  slug: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  profileImage?: string;

  @Prop({ type: String, required: true })
  bgColor: string;

  @Prop({ type: String })
  url?: string;

  @Prop({ type: String, required: true })
  target: string;

  @Prop({ type: Object, required: true })
  qrCode: {
    colors: {
      background: string;
      borderColor: string;
      btnColor?: string;
      presetColor: string;
    };
    eyeRadius: Array<{
      outer: number;
      inner: number;
    }>;
    frame: number;
    logo: string;
    qrStyle: string;
    name: string;
  };

  @Prop({ type: Object })
  metadata?: any;

  @Prop({ type: String, unique: true })
  publicId: string;

  @Prop({ type: Boolean, default: false })
  deleted?: boolean;

  @Prop({ type: Date })
  deletedAt?: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user?: string;

  @Prop({ type: Number, default: 0 })
  totalScanned: number;

  @Prop({ type: Boolean, default: true })
  enableTracking: boolean;
}

export type QrCodeDocument = QrCode & Document;
export const QrCodeSchema = SchemaFactory.createForClass(QrCode);

// Update schema configuration
QrCodeSchema.statics.config = function () {
  return {
    uniques: ['title', 'slug'],
    fillables: ['title', 'description', 'type', 'bgColor', 'profileImage', 'target', 'qrCode', 'url', 'metadata'],
    updateFillables: ['title', 'description', 'bgColor', 'profileImage', 'qrCode', 'url', 'metadata'],
    softDelete: true,
    returnDuplicate: false,
    idToken: 'qrc',
  };
};
