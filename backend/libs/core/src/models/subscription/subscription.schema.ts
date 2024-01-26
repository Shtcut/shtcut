import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FileTypeOption } from 'shtcut/core';

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
    type: Date,
  })
  startDate: Date;

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

const MediaSchema = SchemaFactory.createForClass(Subscription);

MediaSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

MediaSchema.statics.config = () => {
  return {
    idToken: 'media',
    uniques: [],
    fillables: ['workspace', 'user', 'startDate', 'endDate', 'status'],
    hiddenFields: ['deleted'],
  };
};

export { MediaSchema };
