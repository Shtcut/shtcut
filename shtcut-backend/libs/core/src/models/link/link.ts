import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LinkDocument = Link & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Link {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
  })
  backHalf: string;

  @Prop({
    type: String,
    required: true,
  })
  originalURL: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  owner: any;

  @Prop({
    type: String,
    default: 'https://shtcut.link',
  })
  domain: string;

  @Prop({
    type: String,
  })
  shortUrl: string;

  @Prop({
    type: [Types.ObjectId],
    ref: 'Hit',
  })
  hits: any;

  @Prop({
    type: Boolean,
    default: false,
  })
  enableTracking: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  hitCount: number;

  @Prop({
    type: String,
    required: false,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: Date,
  })
  expiryDate: Date;

  @Prop({
    type: Boolean,
    default: false,
  })
  isPrivate: boolean;

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

const LinkSchema = SchemaFactory.createForClass(Link);

LinkSchema.statics.searchQuery = (q: string) => {
  const regex = new RegExp(q);
  return [
    { title: { $regex: regex, $options: 'i' } },
    { originalURL: { $regex: regex, $options: 'i' } },
    { backHalf: { $regex: regex, $options: 'i' } },
  ];
};

LinkSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

LinkSchema.pre('save', function (next) {
  this.shortUrl = `${this.domain}/${this.backHalf}`;
  next();
});

LinkSchema.statics.config = () => {
  return {
    idToken: 'lnk',
    uniques: ['backHalf'],
    fillables: ['backHalf', 'originalURL', 'owner', 'hit', 'expiryDate', 'enableTracking', 'password'],
    hiddenFields: ['deleted', 'password'],
  };
};

export { LinkSchema };
