import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MGSchema } from 'mongoose';
import { Dict } from 'shtcut/core';

export type FeatureDocument = Feature & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Feature {
  @Prop({
    type: String,
    unique: true,
  })
  public publicId: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  slug: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: [MGSchema.Types.Mixed],
  })
  properties: Dict[];

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  deleted: boolean;
}

const FeatureSchema = SchemaFactory.createForClass(Feature);

FeatureSchema.statics.searchQuery = (q) => {
  const regex = new RegExp(q);
  return [
    { name: { $regex: regex, $options: 'i' } },
    { description: { $regex: regex, $options: 'i' } },
    { slug: { $regex: regex, $options: 'i' } },
  ];
};

FeatureSchema.statics.config = () => {
  return {
    idToken: 'fts',
    uniques: ['slug', 'title'],
    slugify: 'title',
    softDelete: false,
    fillables: ['slug', 'title', 'description', 'properties'],
    updateFillable: ['title', 'description'],
    hiddenFields: ['deleted'],
  };
};

export { FeatureSchema };
