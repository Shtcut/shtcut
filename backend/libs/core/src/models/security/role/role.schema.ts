import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Role {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  public publicId: string;

  @Prop({
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
  })
  description?: string;

  @Prop([
    {
      type: Types.ObjectId,
      required: true,
      ref: 'Permission',
    },
  ])
  permissions: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDefault: boolean;

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  deleted: boolean;
}

const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.statics.config = () => {
  return {
    idToken: 'role',
    uniques: ['title'],
    fillables: ['title', 'description', 'permissions'],
    updateFillables: ['title', 'description', 'permissions'],
    hiddenFields: ['deleted'],
  };
};

export { RoleSchema };
