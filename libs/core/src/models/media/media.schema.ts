import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FileTypeOption } from 'shtcut/core';

export type MediaDocument = Media & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
})
export class Media {
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

  @Prop(
    raw({
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
        default: 'jpg',
      },
    }),
  )
  file: FileTypeOption;

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

const MediaSchema = SchemaFactory.createForClass(Media);

MediaSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

MediaSchema.statics.config = () => {
  return {
    idToken: 'media',
    uniques: [],
    fillables: ['file', 'user'],
    hiddenFields: ['deleted'],
  };
};

export { MediaSchema };
