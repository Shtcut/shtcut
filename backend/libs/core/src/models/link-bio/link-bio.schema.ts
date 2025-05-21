import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MG } from 'mongoose';
import { Dict } from 'shtcut/core/shared';

export type LinkBioDocument = LinkBio & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class LinkBio {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
  })
  slug: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
  })
  template: string;

  @Prop({
    type: MG.Types.ObjectId,
    ref: 'Workspace',
  })
  workspace: any;

  @Prop({
    type: MG.Types.ObjectId,
    ref: 'Domain',
  })
  domain: any;

  @Prop({
    type: String,
  })
  profileImage: string;

  @Prop({
    type: [MG.Types.Mixed],
  })
  links: Dict[];

  @Prop({
    type: MG.Types.Mixed,
  })
  colors: Dict;

  @Prop({
    type: MG.Types.Mixed,
  })
  contacts: Dict;

  @Prop({
    type: {
      city: String,
      postal: String,
      state: String,
      street: String,
      zipCode: Number,
      country: String,
    },
  })
  address: Dict;

  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  clicks: number;

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  deleted: boolean;
}

const LinkBioSchema = SchemaFactory.createForClass(LinkBio);

LinkBioSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

LinkBioSchema.statics.searchQuery = (q: string) => {
  const regex = new RegExp(q);
  return [
    { title: { $regex: regex, $options: 'i' } },
    { description: { $regex: regex, $options: 'i' } },
    { 'address.city': { $regex: regex, $options: 'i' } },
    { 'address.postal': { $regex: regex, $options: 'i' } },
    { 'address.state': { $regex: regex, $options: 'i' } },
    { 'address.street': { $regex: regex, $options: 'i' } },
    { 'address.country': { $regex: regex, $options: 'i' } },
  ];
};

LinkBioSchema.statics.config = () => {
  return {
    idToken: 'lnk-bio',
    slugify: 'title',
    uniques: ['title'],
    fillables: [
      'name',
      'title',
      'slug',
      'contacts',
      'description',
      'template',
      'profileImage',
      'colors',
      'links',
      'address',
      'workspace',
    ],
    updateFillables: [
      'name',
      'slug',
      'contacts',
      'description',
      'template',
      'profileImage',
      'colors',
      'links',
      'address',
      'clicks',
    ],
    hiddenFields: ['deleted'],
  };
};

export { LinkBioSchema };
