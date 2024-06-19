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
  yearly: number;

  @IsNotEmpty()
  @IsNumber()
  monthly: number;
}
