import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
    unique: true,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  slug: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: [String],
  })
  properties: string[];

  @Prop({
    type: Boolean,
    default: false,
  })
  isFree: boolean;

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
    uniques: ['slug', 'name'],
    slugify: 'name',
    fillables: ['slug', 'name', 'description', 'properties'],
    updateFillable: ['name', 'description', 'price'],
    hiddenFields: ['deleted'],
  };
};

export { FeatureSchema };
