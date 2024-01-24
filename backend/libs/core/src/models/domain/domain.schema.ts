import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
    ref: 'Campaign',
  })
  campaign: any;

  @Prop([
    {
      type: Types.ObjectId,
      ref: 'Link',
    },
  ])
  links: any;

  @Prop({
    type: String,
    default: 'https://shtcut.link',
  })
  name: string;

  @Prop(
    raw({
      code: String,
      verified: {
        type: Boolean,
        default: false,
      },
    }),
  )
  verification: {
    code: string;
    verified: boolean;
  };

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

DomainSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

DomainSchema.statics.config = () => {
  return {
    idToken: 'dmn',
    uniques: ['campaign', 'name'],
    fillables: ['campaign', 'links', 'name', 'description', 'type', 'isDefault', 'active', 'banned'],
    updateFillables: ['links', 'name', 'description', 'type', 'isDefault', 'active', 'banned'],
    hiddenFields: ['deleted', 'verification'],
  };
};

export { DomainSchema };
