import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MGSchema } from 'mongoose';
import { MobileOption } from 'shtcut/core/shared';

export type AuthDocument = Auth & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class Auth {
  @Prop({
    type: String,
    unique: true,
  })
  public publicId: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  public email: string;

  @Prop({
    type: String,
    select: false,
    minlength: 6,
  })
  public password: string;

  @Prop({
    type: String,
  })
  public socialId: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  public accountVerified: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  public socialAuth: boolean;

  @Prop({
    type: String,
    enum: ['facebook', 'google', 'twitter', 'apple', 'github'],
  })
  public socialType: string;

  @Prop({
    type: {
      phoneNumber: String,
      isoCode: {
        type: String,
        default: 'NG',
      },
    },
  })
  public mobile: MobileOption;

  @Prop(
    raw({
      email: {
        type: Boolean,
        default: false,
      },
      mobile: {
        type: Boolean,
        default: false,
      },
    }),
  )
  public verifications: { email: boolean; mobile: boolean };

  @Prop({
    type: MGSchema.Types.Mixed,
  })
  verificationCodes: any;

  @Prop({
    type: Boolean,
    default: false,
  })
  public isAdmin: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  public active: boolean;

  @Prop({
    type: Boolean,
    default: false,
    selected: false,
  })
  public deleted: boolean;
}

const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.statics.config = () => {
  return {
    idToken: 'aut',
    uniques: ['email'],
    fillables: [''],
    updateFillables: [''],
    hiddenFields: ['deleted', 'verificationCodes'],
  };
};

AuthSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

AuthSchema.virtual('user', {
  ref: 'User',
  localField: '_id',
  foreignField: '_id',
  justOne: true,
  match: { deleted: false },
});

export { AuthSchema };
