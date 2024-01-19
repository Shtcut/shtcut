import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MGSchema } from 'mongoose';

export type AdminAuthDocument = AdminAuth & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class AdminAuth {
  _id: any;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: String,
    email: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    select: false,
  })
  password: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  changePassword: boolean;

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

const AdminAuthSchema = SchemaFactory.createForClass(AdminAuth);

AdminAuthSchema.statics.config = () => {
  return {
    idToken: 'auth',
    uniques: ['email'],
    fillables: [],
  };
};

export { AdminAuthSchema };
