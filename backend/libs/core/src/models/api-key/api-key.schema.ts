import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { configuration } from '@config';

export type ApiKeyDocument = ApiKey & Document;

@Schema({
  timestamps: true,
  autoCreate: true,
  toJSON: { virtuals: true },
  toObject: {
    virtuals: true,
  },
})
export class ApiKey {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  publicId: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  secretHash: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  publicKey: string;

  @Prop({
    type: String,
    enum: configuration().app.data.apiKeyType,
    default: 'test',
  })
  keyType: 'test' | 'production' | 'internal';

  @Prop({
    type: String,
    enum: configuration().app.data.apiKeyEnv,
    default: 'sandbox',
  })
  environment: 'sandbox' | 'staging' | 'live' | 'internal';

  @Prop({
    type: String,
    enum: configuration().app.data.plans,
    default: 'pro',
  })
  planType: 'free' | 'pro' | 'enterprise' | 'internal';

  @Prop({
    type: [String],
    default: [],
  })
  permissions?: string[];

  @Prop({
    type: Date,
    default: null,
  })
  expiresAt?: Date;

  @Prop({
    type: Number,
    default: 0,
  })
  usageCount: number;

  @Prop({
    type: Date,
    default: null,
  })
  lastUsedAt?: Date;

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

const ApiKeySchema = SchemaFactory.createForClass(ApiKey);

ApiKeySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

ApiKeySchema.index({ publicKey: 1 });
ApiKeySchema.index({ keyType: 1, environment: 1 });
ApiKeySchema.index({ active: 1 });

ApiKeySchema.statics.config = () => {
  return {
    idToken: 'apk',
    uniques: ['name'],
    fillables: ['name', 'user', 'permissions', 'environment'],
    hiddenFields: ['deleted'],
  };
};

export { ApiKeySchema };
