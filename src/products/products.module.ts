import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './domain/product';
import { ProductsService } from './products.service';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { ProductsController } from './products.controller';
import { ProductNew, ProductNewSchema } from './dto/product.schema';
import { allFeedback, allFeedbackSchema } from './dto/feedback.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: ProductNew.name, schema: ProductNewSchema },
            { name: allFeedback.name, schema: allFeedbackSchema }
        ]),
    ],
    providers: [ProductsService, ProductRepository], // Регистрируем сервис и репозиторий
    controllers: [ProductsController], // Регистрируем контроллер
})
export class ProductsModule {}
