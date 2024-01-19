import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MGSchema } from 'mongoose';

export type UserRoleDocument = UserRole & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class UserRole {
  _id: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: MGSchema.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  user: any;

  @Prop({
    type: MGSchema.Types.ObjectId,
    required: true,
    ref: 'Campaign',
  })
  campaign: any;

  @Prop({
    type: MGSchema.Types.ObjectId,
    required: true,
    ref: 'Role',
  })
  role: any;

  @Prop({
    type: [MGSchema.Types.ObjectId],
    ref: 'Permissions',
  })
  permissions: any[];

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

const UserRoleSchema = SchemaFactory.createForClass(UserRole);

UserRoleSchema.statics.config = () => {
  return {
    idToken: 'usr-role',
    softDelete: true,
    uniques: [],
    fillables: ['role', 'user'],
    updateFillables: ['role', 'user'],
    objectIds: ['campaign', 'user', 'role', 'permissions'],
    hiddenFields: ['deleted'],
  };
};

export { UserRoleSchema };
