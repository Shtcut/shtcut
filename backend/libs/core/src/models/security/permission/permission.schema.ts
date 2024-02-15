import { configuration } from '@config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PermissionsDocument = Permissions & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Permissions {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  public publicId: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
  })
  key: string;

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  deleted: boolean;
}

const PermissionsSchema = SchemaFactory.createForClass(Permissions);

PermissionsSchema.statics.config = () => {
  return {
    idToken: 'permissions',
    uniques: ['title', 'key'],
    fillables: ['title', 'description', 'key'],
    updateFillables: ['title', 'description', 'key'],
    hiddenFields: ['deleted'],
  };
};

export { PermissionsSchema };
