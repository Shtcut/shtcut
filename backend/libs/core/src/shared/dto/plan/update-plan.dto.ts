import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdatePlanDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsArray()
  @IsOptional()
  readonly features: string[];

  @IsOptional()
  readonly byPercentage: boolean;

  @IsNotEmpty()
  @IsOptional()
  readonly price: number;

  @IsOptional()
  @IsString()
  @IsEnum(['USD', 'EUR', 'GBP'])
  readonly currency: string;

  @IsBoolean()
  @IsOptional()
  readonly isFree: boolean;

  @IsOptional()
  @IsOptional()
  readonly yearlyDiscount: number;

  @IsNumber()
  @IsOptional()
  readonly quarterlyDiscount: number;
}
