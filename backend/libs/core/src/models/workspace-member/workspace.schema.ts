import { configuration } from '@config';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MGS } from 'mongoose';

export type WorkspaceDocument = WorkspaceMember & Document;

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
    ref: 'Workspace',
  })
  workspace: any;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  user: any;

  @Prop({
    type: [String],
    enum: configuration().app.modules,
    required: true,
  })
  modules: string[];

  @Prop({
    type: String,
    enum: ['pending', 'accepted'],
    default: 'pending',
  })
  invitationStatus: string;

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

const WorkspaceMembersSchema = SchemaFactory.createForClass(WorkspaceMember);

WorkspaceMembersSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

WorkspaceMembersSchema.statics.config = () => {
  return {
    idToken: 'wrk-mbm',
    uniques: ['user'],
    fillables: [
      'user',
      'slug',
      'plan',
      'type',
      'domains',
      'isDefault',
      'modules',
      'subscriptions',
      'logo',
      'capacity',
    ],
    updateFillables: ['workspace', 'user', 'invitationStatus', 'isDefault', 'modules', 'logo'],
    hiddenFields: ['deleted'],
  };
};

export { WorkspaceMembersSchema };
