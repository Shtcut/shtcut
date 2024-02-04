import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Document, Types, Schema as MGSchema } from 'mongoose';

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
    type: Types.ObjectId,
    ref: 'AdminAuth',
  })
  user: any;

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
    type: String,
    enum: ['USD', 'EUR', 'GBP'],
    default: 'USD',
  })
  currency: string;

  @Prop({
    type: MGSchema.Types.Mixed,
  })
  limits: number;

  @Prop({
    type: Number,
    default: 0,
  })
  yearly: number;

  @Prop({
    type: Number,
    default: 0,
  })
  monthly: number;

  @Prop({
    type: Number,
    default: 0,
  })
  quarterly: number;

  @Prop({
    type: [
      {
        type: MGSchema.Types.ObjectId,
        ref: 'Feature',
        required: true,
      },
    ],
  })
  features: any[];

  @Prop({
    type: String,
    enum: ['monthly', 'yearly'],
    default: 'monthly',
  })
  billingFrequency: any;

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
  if (_.isNumber(q) && !_.isNaN(parseInt(String(q)))) {
    query.push({ price: Number(q) });
    query.push({ monthly: Number(q) });
    query.push({ yearly: Number(q) });
    query.push({ quarterly: Number(q) });
  }
  return [{ name: { $regex: regex, $options: 'i' } }, { description: { $regex: regex, $options: 'i' } }, ...query];
};

PlanSchema.statics.config = () => {
  return {
    idToken: 'pln',
    uniques: ['slug', 'name'],
    slugify: 'name',
    softDelete: false,
    fillables: [
      'slug',
      'user',
      'name',
      'description',
      'price',
      'yearly',
      'monthly',
      'quarterly',
      'currency',
      'yearly',
      'features',
      'user',
      'limits',
      'isFree',
    ],
    updateFillable: [
      'name',
      'description',
      'price',
      'quarterly',
      'currency',
      'yearly',
      'monthly',
      'features',
      'user',
      'limits',
      'isFree',
    ],
    hiddenFields: ['deleted'],
  };
};

export { PlanSchema };
