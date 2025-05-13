import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    ratingQuantity: number;

    @Prop({ required: true })
    feedback: string;

    @Prop({ required: true })
    genetics: string;

    @Prop({ required: true })
    THC: string;

    @Prop({ required: true })
    CBD: string;

    @Prop({ required: true })
    strain: string;

    @Prop({ required: true })
    country: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
