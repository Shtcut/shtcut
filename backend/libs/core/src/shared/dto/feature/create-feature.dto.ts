import { IsNotEmpty, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  readonly visaService: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @IsString()
  @IsOptional()
  readonly message: string;
}
