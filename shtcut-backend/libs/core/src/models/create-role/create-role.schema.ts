import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FileTypeOption } from 'shtcut/core';

@Schema({
    timestamps: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

export class CreateRole extends Document {
    @Prop({
      type: String,
      unique: true,
      required: true,
    })
    title: string;
  
    @Prop({
      type: String,
    })
    description?: string;
  }
  
  export const RoleSchema = SchemaFactory.createForClass(CreateRole);
  