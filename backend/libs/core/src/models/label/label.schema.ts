import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LabelDocument = Label & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Label {
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

const LabelSchema = SchemaFactory.createForClass(Label);

LabelSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

LabelSchema.statics.config = () => {
  return {
    idToken: 'tag',
    slugify: 'slug',
    uniques: ['name'],
    fillables: ['name', 'color', 'slug'],
    updateFillables: ['name', 'color', 'link'],
    hiddenFields: ['deleted'],
  };
};

export { LabelSchema };
