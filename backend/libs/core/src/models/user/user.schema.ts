import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MobileOption, Media } from 'shtcut/core';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class User {
  @Prop({
    type: String,
    unique: true,
  })
  public publicId: string;

  @Prop({
    type: String,
    email: true,
    lowercase: true,
    trim: true,
  })
  public email: string;

  @Prop({
    type: String,
  })
  public firstName: string;

  @Prop({
    type: String,
  })
  public lastName: string;

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

  @Prop({
    type: String,
  })
  public gender: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Role',
    required: true,
  })
  roles: any;

  @Prop([
    {
      type: Types.ObjectId,
      ref: 'Workspaces',
    },
  ])
  workspaces: any[];

  @Prop({
    type: Types.ObjectId,
    ref: 'Media,',
  })
  public avatar: any;

  @Prop({
    type: Boolean,
    default: true,
  })
  public active: boolean;

  @Prop({
    type: Boolean,
    select: false,
    default: false,
  })
  public deleted: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.statics.searchQuery = (q: string) => {
  const regex = new RegExp(q);
  return [
    { firstName: { $regex: regex, $options: 'i' } },
    { lastName: { $regex: regex, $options: 'i' } },
    { email: { $regex: regex, $options: 'i' } },
  ];
};

UserSchema.statics.config = () => {
  return {
    idToken: 'usr',
    uniques: ['email'],
    fillables: ['mobile', 'firstName', 'lastName', 'email', 'workspaces'],
    updateFillables: ['firstName', 'lastName', 'gender', 'avatar', 'mobile'],
    hiddenFields: ['deleted'],
  };
};

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.virtual('auth', {
  ref: 'Auth',
  localField: '_id',
  foreignField: '_id',
  justOne: true,
  match: {
    deleted: false,
  },
});

export { UserSchema };
