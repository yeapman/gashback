import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { Product } from './domain/product';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductNew } from './dto/product.schema';
import { allFeedback, allFeedbackSchema } from './dto/feedback.schema';

@Injectable()
export class ProductsService {
    constructor(  @InjectModel(allFeedback.name) private readonly allFeedbackSchema: Model<allFeedback[]>, private readonly productRepository: ProductRepository, @InjectModel(ProductNew.name) private productModel: Model<ProductNew>, @InjectModel(allFeedback.name) private feedbackModel: Model<allFeedback>) {}

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

        await this.feedbackModel.create({
            productId: productId,
            allFeedback: createReviewDto.currentFeedback,
            rating: createReviewDto.rating
        });

        product.averageRating = ((product.averageRating * product.reviewsCount) + rating!) / (product.reviewsCount + 1);
        product.reviewsCount += 1;

        await product.save();

        return {
            averageRating: product.averageRating,
            reviewsCount: product.reviewsCount,
        };
    }



    async findFeedbacksById(productId: string): Promise<allFeedback[]> {
        return this.feedbackModel.find({productId}).lean().exec();
    }



    async calculateAverageRating(productId: string): Promise<number> {
        // Получаем все отзывы для данного товара
        const reviews = await this.feedbackModel.find({ productId });

        // Если отзывы есть, считаем средний рейтинг
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            return totalRating / reviews.length;
        }

        // Если отзывов нет, возвращаем 0
        return 0;
    }



    // Метод для обновления рейтинга у продукта
    async updateRating(productId: string, averageRating: number): Promise<void> {
        await this.productModel.updateOne(
          { _id: productId },
          { $set: { rating: averageRating } },
        );
    }
    //
    // // Метод для получения продуктов с пагинацией
    // async findManyWithPagination(paginationOptions: { filterOptions: any; paginationOptions: { skip: number; limit: number; } }): Promise<Product[]> {
    //     // Пример использования пагинации
    //     const { skip, limit } = paginationOptions.paginationOptions;
    //     return this.productModel.find(paginationOptions.filterOptions)
    //       .skip(skip)
    //       .limit(limit)
    //       .exec();
    // }


}
