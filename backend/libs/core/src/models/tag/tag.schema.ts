import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type TagDocument = Tag & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Tag {
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
  })
  slug: string;

  @Prop({
    type: String,
    default: 'blue',
  })
  color: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Campaign',
  })
  campaign: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'Link',
  })
  link: any;

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

const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TagSchema.statics.config = () => {
  return {
    idToken: 'tag',
    slugify: 'slug',
    uniques: ['name', 'campaign'],
    fillables: ['name', 'campaign', 'color', 'link', 'slug'],
    updateFillables: ['name', 'campaign', 'color', 'link'],
    hiddenFields: ['deleted'],
  };
};

export { TagSchema };
