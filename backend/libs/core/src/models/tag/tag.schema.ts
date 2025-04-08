import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Tag {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  public publicId: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    enum: ['link', 'social'],
    default: 'link',
  })
  type: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    select: false,
  })
  user: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Workspace',
    select: false,
  })
  workspace: any;

  @Prop({
    type: String,
    lowercase: true,
  })
  color: string;

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  deleted: boolean;
}

const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.statics.config = () => {
  return {
    idToken: 'tag',
    uniques: ['name', 'color', 'user', 'type'],
    returnDuplicate: true,
    fillables: ['name', 'description', 'color', 'user', 'type', 'workspace'],
    updateFillables: ['name', 'description', 'color', 'user', 'workspace'],
    hiddenFields: ['deleted'],
  };
};

export { TagSchema };
