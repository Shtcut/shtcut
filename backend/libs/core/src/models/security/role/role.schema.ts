import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  title: string;

  @Prop({
    type: String,
  })
  description?: string;

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
    uniques: [],
    fillables: ['title', 'description'],
    hiddenFields: ['deleted'],
  };
};

export { RoleSchema };
