import { Injectable } from '@nestjs/common';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { Product } from './domain/product';

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductRepository) {}

    // Метод для получения списка товаров с пагинацией
    async findManyWithPagination({
                                     filterOptions,
                                     paginationOptions,
                                 }: {
        filterOptions?: any;
        paginationOptions: { skip: number; limit: number };
    }): Promise<Product[]> {
        return this.productRepository.findManyWithPagination({
            filterOptions,
            paginationOptions,
        });
    }

    // Метод для получения товара по ID
    async findById(id: string): Promise<Product | null> {
        return this.productRepository.findById(id);
    }

    // Метод для создания нового товара
    async create(createProductDto: any): Promise<Product> {
        return await this.productRepository.create(createProductDto);
    }
}
