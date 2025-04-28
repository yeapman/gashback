import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'products' })
export class ProductNew extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ default: 0 })
  reviewsCount: number;
}

export const ProductNewSchema = SchemaFactory.createForClass(ProductNew);
