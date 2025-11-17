import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CvDocument = CV & Document;

@Schema()
export class CV {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  filePath: string;
}

export const CvSchema = SchemaFactory.createForClass(CV);
