import { configuration } from '@config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Subscription {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  })
  user: any;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Plan',
  })
  plan: any;

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'workspace',
  })
  workspace: any;

  @Prop({
    type: String,
    enum: ['active', 'cancelled'],
    default: 'active',
  })
  status: any;

  @Prop({
    type: String,
    enum: configuration().app.modules,
    default: 'shtcut-shortener',
  })
  module: string;

  @Prop({
    type: Date,
  })
  startDate: Date;

  @Prop({
    type: Date,
  })
  cancelledOn: Date;

  @Prop({
    type: Date,
  })
  expiresOn: Date;

  @Prop({
    type: String,
  })
  transactionRef: string;

  @Prop({
    type: Date,
  })
  endDate: Date;

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

const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

SubscriptionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

SubscriptionSchema.statics.config = () => {
  return {
    idToken: 'sub',
    uniques: [],
    fillables: ['workspace', 'user', 'startDate', 'endDate', 'status', 'module', 'plan'],
    objectIds: ['user', 'plan'],
    dateFilters: ['startAt', 'endAt'],
    hiddenFields: ['deleted'],
  };
};

export { SubscriptionSchema };
