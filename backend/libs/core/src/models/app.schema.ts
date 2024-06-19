import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AppDocument = App & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class App {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: String,
    lowercase: true,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    lowercase: true,
  })
  alias: string;
  @Prop({
    type: String,
    default: null,
  })
  icon: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDefault: boolean;

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

const AppSchema = SchemaFactory.createForClass(App);

AppSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

AppSchema.statics.config = () => {
  return {
    idToken: 'app',
    uniques: ['name'],
    fillables: ['name', 'alias'],
    updateFillables: ['name', 'alias'],
    hiddenFields: ['deleted'],
  };
};

export { AppSchema };
