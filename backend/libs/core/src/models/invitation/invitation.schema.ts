import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InvitationDocument = Invitation & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Invitation {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Workspace',
  })
  workspace: any;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  token: string;

  @Prop({
    expires: '7d',
  })
  expiresAt: Date;

  @Prop({
    required: true,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  })
  status: string;

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  deleted: boolean;
}

const InvitationSchema = SchemaFactory.createForClass(Invitation);

InvitationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

InvitationSchema.statics.config = () => {
  return {
    idToken: 'inv',
    uniques: ['email'],
    fillables: ['email', 'workspace', 'publicId', 'token', 'accepted'],
    updateFillables: ['email', 'workspace', 'publicId', 'token', 'accepted'],
    hiddenFields: ['deleted'],
  };
};

export { InvitationSchema };
