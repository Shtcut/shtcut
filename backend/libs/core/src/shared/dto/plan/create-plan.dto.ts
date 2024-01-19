import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  @IsNotEmpty()
  features: string[];

  @IsNotEmpty()
  @IsBoolean()
  byPercentage: boolean;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['USD', 'EUR', 'GBP'])
  currency: string;

  @IsNotEmpty()
  @IsBoolean()
  isFree: boolean;

  @IsNotEmpty()
  @IsNumber()
  yearlyDiscount: number;

  @IsNotEmpty()
  @IsNumber()
  quarterlyDiscount: number;
}
