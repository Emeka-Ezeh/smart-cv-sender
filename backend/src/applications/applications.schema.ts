import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
  @Prop({ required: true })
  jobId: number;

  @Prop({ required: true })
  cvId: number;

  @Prop({ default: 'pending' })
  status: string; // e.g. pending, sent, rejected, accepted
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
