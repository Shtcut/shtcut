import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class ExternalLink {
  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: null, type: Types.ObjectId, ref: 'Media' })
  image: string;
}
