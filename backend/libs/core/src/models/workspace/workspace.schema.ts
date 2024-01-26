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
    uniques: ['slug', 'name'],
    fillables: ['user', 'name', 'plan', 'links', 'domains', 'isDefault'],
    hiddenFields: ['deleted'],
  };
};

export { WorkspaceSchema };
