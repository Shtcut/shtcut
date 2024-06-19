import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types, Schema as MGSchema } from 'mongoose';
import { AdminAuth } from '../admin-auth';

export type DomainDocument = Domain & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Domain {
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
    type: Types.ObjectId,
    ref: 'Workspace',
  })
  workspace: any;

  @Prop([
    {
      type: Types.ObjectId,
      ref: 'Link',
    },
  ])
  links: any;

  @Prop({
    type: String,
    lowercase: true,
    default: 'shtcut.link',
  })
  name: string;

  @Prop({
    type: String,
    lowercase: true,
    default: 'shtcut.link',
  })
  slug: string;

  @Prop({
    type: String,
    default: 'https://shtcut.link',
  })
  landingPage: string;

  @Prop([
    {
      type: MGSchema.Types.Mixed,
    },
  ])
  verification: {
    domain: string;
    value: string;
    type: string;
  }[];

  @Prop({
    type: Boolean,
    default: false,
  })
  verified: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDefault: boolean;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
    default: 'redirect',
  })
  type: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  banned: boolean;

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

const DomainSchema = SchemaFactory.createForClass(Domain);

DomainSchema.statics.searchQuery = (q: string) => {
  const regex = new RegExp(q);
  return [
    { name: { $regex: regex, $options: 'i' } },
    { 'verification.dnsType': { $regex: regex, $options: 'i' } },
    { type: { $regex: regex, $options: 'i' } },
    { slug: { $regex: regex, $options: 'i' } },
  ];
};

DomainSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

DomainSchema.statics.config = () => {
  return {
    idToken: 'dmn',
    slugify: 'name',
    softDelete: false,
    uniques: ['workspace', 'name'],
    fillables: ['workspace', 'links', 'user', 'slug', 'name', 'description', 'type', 'active', 'banned', 'landingPage'],
    updateFillables: ['links', 'description', 'type', 'active', 'banned'],
    hiddenFields: ['deleted'],
  };
};

export { DomainSchema };
