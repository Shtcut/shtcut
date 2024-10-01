import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MGS } from 'mongoose';
import { Workspace, Role, User } from 'shtcut/core';

export type WorkspaceMemberDocument = WorkspaceMember & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class WorkspaceMember {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: string | User | Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Workspace',
    required: true,
  })
  workspace: string | Workspace | Types.ObjectId;

  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  role: string | Role;

  @Prop({
    type: Date,
    default: Date.now,
  })
  joinedAt: Date;

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

const WorkspaceMemberSchema = SchemaFactory.createForClass(WorkspaceMember);

WorkspaceMemberSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

WorkspaceMemberSchema.statics.config = () => {
  return {
    idToken: 'wrk-mbm',
    uniques: [],
    fillables: ['user', 'workspace', 'role', 'joinedAt'],
    updateFillables: ['user', 'workspace', 'role', 'joinedAt'],
    hiddenFields: ['deleted'],
  };
};

export { WorkspaceMemberSchema };
