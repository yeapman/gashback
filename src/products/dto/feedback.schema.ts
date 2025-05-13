import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'allfeedback' })
export class allFeedback extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: true })
  allFeedback: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const allFeedbackSchema = SchemaFactory.createForClass(allFeedback);
