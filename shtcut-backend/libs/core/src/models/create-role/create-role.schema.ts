import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FileTypeOption } from 'shtcut/core';

@Schema({
    timestamps: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

