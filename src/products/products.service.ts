import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { Product } from './domain/product';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductNew } from './dto/product.schema';

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductRepository, @InjectModel(ProductNew.name) private productModel: Model<ProductNew>) {}

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




    async addReview(productId: string, createReviewDto: CreateReviewDto) {
        const { rating } = createReviewDto;
        console.log(productId);
        const product = await this.productModel.findById(productId);
        console.log(product);
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        product.averageRating = ((product.averageRating * product.reviewsCount) + rating!) / (product.reviewsCount + 1);
        product.reviewsCount += 1;

        await product.save();

        return {
            averageRating: product.averageRating,
            reviewsCount: product.reviewsCount,
        };
    }



}
