import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Document, Types } from 'mongoose';

export type PlanDocument = Plan & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Plan {
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
  description?: string;

  @Prop({
    type: Boolean,
    default: false,
    select: false,
  })
  isDefault: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  price: number;

  @Prop({
    type: Number,
    default: 0,
  })
  yearlyDiscount: number;

  @Prop({
    type: Number,
    default: 0,
  })
  quarterlyDiscount: number;

  @Prop([
    {
      type: Types.ObjectId,
      ref: 'Feature',
      required: true,
    },
  ])
  features: any[];

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

const PlanSchema = SchemaFactory.createForClass(Plan);

PlanSchema.statics.searchQuery = (q) => {
  const regex = new RegExp(q);
  const query = [];
  if (_.isNumber(Number(q) && !_.isNaN(parseInt(q)))) {
    query.push({ price: Number(q) });
    query.push({ quarterlyDiscount: Number(q) });
    query.push({ yearlyDiscount: Number(q) });
  }
  return [{ name: { $regex: regex, $options: 'i' } }, { description: { $regex: regex, $options: 'i' } }, ...query];
};

PlanSchema.statics.config = () => {
  return {
    idToken: 'pln',
    uniques: ['slug', 'name'],
    slugify: 'name',
    fillables: [
      'slug',
      'name',
      'description',
      'price',
      'quarterlyDiscount',
      'yearlyDiscount',
      'features',
      'user',
      'isFree',
    ],
    updateFillable: [
      'name',
      'description',
      'price',
      'quarterlyDiscount',
      'yearlyDiscount',
      'features',
      'user',
      'isFree',
    ],
    hiddenFields: ['deleted'],
  };
};

export { PlanSchema };
