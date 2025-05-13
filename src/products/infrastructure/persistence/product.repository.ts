import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../domain/product';

@Injectable()
export class ProductRepository {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {

    }

    // Метод для получения товаров с пагинацией и фильтрацией
    async findManyWithPagination({
                                     filterOptions,
                                     paginationOptions,
                                 }: {
        filterOptions?: any;
        paginationOptions: { skip: number; limit: number };
    }): Promise<Product[]> {
        const query = this.productModel
            .find(filterOptions || {})
            .skip(paginationOptions.skip)
            .limit(paginationOptions.limit)
            .lean();

        const result = await query; // Ждём выполнение запроса

        return result.map(({ _id, ...rest }) => ({ _id, id: _id.toString(), ...rest }));
    }

    // Метод для получения товара по ID
    async findById(id: string): Promise<Product | null> {
        return this.productModel.findById(id).exec();
    }

    // Метод для создания товара
    async create(productData: Partial<Product>): Promise<Product> {
        const product = new this.productModel(productData);
        const savedProduct = await product.save();
        return savedProduct.toObject(); // 👈 Это уберет все методы Mongoose
    }
}
