import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Dict } from 'shtcut/core';

export type CampaignDocument = Campaign & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Campaign {
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
    type: Boolean,
    default: false,
  })
  verified: boolean;

  @Prop({
    type: Number,
    default: 10,
  })
  maxDomain: boolean;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  slug: string;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Domain',
      },
    ],
  })
  domains: any;

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
    type: [
      {
        type: Types.ObjectId,
        ref: 'Tag',
      },
    ],
  })
  tags: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Plan',
  })
  plan: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Media',
  })
  logo: string | Dict;

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

const CampaignSchema = SchemaFactory.createForClass(Campaign);

CampaignSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

CampaignSchema.statics.config = () => {
  return {
    idToken: 'prj',
    uniques: ['slug', 'name'],
    fillables: ['user', 'name', 'plan', 'links'],
    hiddenFields: ['deleted'],
  };
};

export { CampaignSchema };
