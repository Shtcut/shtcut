import { IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateLinkDto {
  @IsString()
  @IsOptional()
  public readonly title: string;

  @IsString()
  @IsNotEmpty()
  public readonly originalURL: string;

  @IsString()
  @IsOptional()
  public password: string;

  @IsString()
  @IsOptional()
  public readonly expiryDate: string;

  @IsString()
  @IsOptional()
  public readonly backHalf: string;

  @IsMongoId()
  @IsOptional()
  public readonly owner: string;

  @IsMongoId()
  @IsOptional()
  public readonly campaign: string;

  @IsMongoId()
  @IsOptional()
  public readonly domain: string;

  @IsBoolean()
  @IsOptional()
  public readonly enableTracking: boolean;
}
