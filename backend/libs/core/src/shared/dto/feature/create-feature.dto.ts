import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { IsArray } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsArray()
  @IsOptional()
  readonly properties: string[];
}
