import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true })
  jobId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true })
  cvId: number;

  @Prop({ default: 'pending' })
  status: string; // e.g. pending, sent, rejected, accepted
}

export type ApplicationPopulatedDocument = Application & Document;
export const ApplicationSchema = SchemaFactory.createForClass(Application);
