import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, Min, IsString } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'MacBook Pro', type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: 'https://example.com/iphone15.jpg', type: String })
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiPropertyOptional({ example: 'Mit einer Ersparnis von bis zu 50% finden Sie in diesem online Shop eine große Auswahl an Arzneimitteln und Medikamenten sowie Gesundheitsartikeln. Von Homöopathie und Naturheilkunde, Nahrungsergänzungsmitteln über Kosmetik bis hin zur Tiergesundheit finden Sie bei Ihrer persönlichen Versandapotheke alles. Der Versand ist ab 10€ versandkostenfrei und es werden diverse Zahlungsarten angeboten. Sie können auch selbstverständlich auch Ihre Rezepte einreichen und erhalten Ihre Bestellung schnell und bequem nach Hause.', type: String })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ example: 4.8, type: Number })
    @IsOptional()
    @IsNumber()
    @Min(0)
    rating?: number;

    @ApiPropertyOptional({ example: 4000, type: Number })
    @IsOptional()
    @IsNumber()
    @Min(0)
    feedback?: number;

    @ApiProperty({ example: 'Hybrid', type: String })
    @IsNotEmpty()
    @IsString()
    genetics: string;

    @ApiProperty({ example: '27,0', type: String })
    @IsNotEmpty()
    @IsString()
    THC: string;

    @ApiProperty({ example: '< 1,0%', type: String })
    @IsNotEmpty()
    @IsString()
    CBD: string;

    @ApiProperty({ example: 'Wedding Cake', type: String })
    @IsNotEmpty()
    @IsString()
    strain: string;

    @ApiProperty({ example: 'Kanada', type: String })
    @IsNotEmpty()
    @IsString()
    country: string;

}