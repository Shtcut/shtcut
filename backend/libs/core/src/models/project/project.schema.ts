import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FileTypeOption, Media } from 'shtcut/core';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Project {
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
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  slug: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Plan',
  })
  plan: any;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Link',
      },
    ],
  })
  links: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Media',
  })
  logo: Media;

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

const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

ProjectSchema.statics.config = () => {
  return {
    idToken: 'media',
    uniques: [],
    fillables: ['file', 'user'],
    hiddenFields: ['deleted'],
  };
};

export { ProjectSchema };
