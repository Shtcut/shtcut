import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WorkspaceDocument = Workspace & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Workspace {
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
  isDefault: boolean;

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
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  slug: string;

  @Prop({
    type: String,
    enum: ['personal', 'team'],
    default: 'personal',
  })
  type: string;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Domain',
      },
    ],
  })
  domains: any[];

  @Prop({
    type: Types.ObjectId,
    ref: 'Subscription',
  })
  subscription: any;

  @Prop({
    type: Types.ObjectId,
    default: '',
  })
  logo: string;

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

const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

WorkspaceSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

WorkspaceSchema.statics.config = () => {
  return {
    idToken: 'wrk',
    slugify: 'name',
    uniques: ['name', 'user'],
    fillables: ['user', 'name', 'slug', 'plan', 'type', 'domains', 'isDefault'],
    updateFillables: ['user', 'name', 'slug', 'plan', 'isDefault'],
    hiddenFields: ['deleted'],
  };
};

export { WorkspaceSchema };
