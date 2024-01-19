import { configuration } from '@config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Permission {
  @Prop({
    type: String,
    unique: true,
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
    type: String,
    enum: configuration().app.data.permissionValueType,
    required: true,
  })
  valueType: string;

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  deleted: boolean;
}

const PermissionSchema = SchemaFactory.createForClass(Permission);

PermissionSchema.statics.config = () => {
  return {
    idToken: 'role',
    uniques: [],
    fillables: ['title', 'description'],
    hiddenFields: ['deleted'],
  };
};

export { PermissionSchema };
