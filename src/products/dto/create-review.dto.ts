import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';


export class CreateReviewDto {
  @ApiPropertyOptional({ example: 5, type: Number })
  @IsNotEmpty()
  @IsNumber()
  rating?: number;
}