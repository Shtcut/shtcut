import { configuration } from '@config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MGS } from 'mongoose';

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
    type: String,
    required: true,
    index: true,
  })
  name: string;

  @Prop({
    type: String,
  })
  slug: string;

  @Prop({
    type: [String],
    enum: configuration().app.modules,
    required: true,
  })
  modules: string[];

  @Prop({
    type: String,
    enum: ['personal', 'team'],
    default: 'personal',
  })
  type: string;

  @Prop([
    {
      type: MGS.Types.ObjectId,
      ref: 'Domain',
    },
  ])
  domains: any[];

  @Prop([
    {
      type: MGS.Types.ObjectId,
      ref: 'Subscription',
      required: true,
    },
  ])
  subscriptions: any[];

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
    uniques: ['name', 'slug', 'user'],
    fillables: ['user', 'name', 'slug', 'plan', 'type', 'domains', 'isDefault', 'modules', 'subscriptions'],
    updateFillables: ['user', 'name', 'plan', 'isDefault', 'subscriptions', 'modules'],
    hiddenFields: ['deleted'],
  };
};

export { WorkspaceSchema };
