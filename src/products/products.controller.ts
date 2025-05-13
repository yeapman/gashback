import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './domain/product';
import { CreateReviewDto } from './dto/create-review.dto';
import { allFeedback } from './dto/feedback.schema';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // Получаем все товары с пагинацией
    @Get()
    async getProducts(
      @Query() filterOptions: any,
      @Query('skip') skip = 0,
      @Query('limit') limit = 10,
    ): Promise<any> {
        // Получаем все продукты с пагинацией
        const products = await this.productsService.findManyWithPagination({
            filterOptions,
            paginationOptions: { skip, limit },
        });

        // Для каждого продукта получаем средний рейтинг и обновляем его в базе
        for (const product of products) {
            const averageRating = await this.productsService.calculateAverageRating(product._id.toString());
            const roundedAverage = Math.round(averageRating * 10) / 10;
            // Обновляем продукт с рассчитанным средним рейтингом
            await this.productsService.updateRating(product._id.toString(), roundedAverage);
        }

        return products;
    }

    // Получаем товар по ID
    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product | null> {
        return this.productsService.findById(id);
    }

    @Get(':id/feedback')
    async getFeedback(@Param('id') id: string): Promise<allFeedback[]> {
        return this.productsService.findFeedbacksById(id);
    }

    // Создаем новый товар
    @Post()
    async createProduct(@Body() createProductDto: any): Promise<Product> {
        return this.productsService.create(createProductDto);
    }


    @Post(':id/review')
    async addReview(@Param('id') productId: string, @Body() createReviewDto: CreateReviewDto) {
        return this.productsService.addReview(productId, createReviewDto);
    }
}
