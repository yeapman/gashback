import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './domain/product';
import { ProductsService } from './products.service';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { ProductsController } from './products.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), // Регистрируем модель
    ],
    providers: [ProductsService, ProductRepository], // Регистрируем сервис и репозиторий
    controllers: [ProductsController], // Регистрируем контроллер
})
export class ProductsModule {}
