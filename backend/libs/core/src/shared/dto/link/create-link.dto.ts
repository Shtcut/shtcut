import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { CreateQrCodeDto } from '../qrcode';

export class CreateLinkDto {
  @IsString()
  @IsOptional()
  public readonly title: string;

  @IsString()
  @IsNotEmpty()
  public readonly target: string;

  @IsString()
  @IsOptional()
  public password: string;

  @IsString()
  @IsOptional()
  public readonly expiryDate: string;

  @IsString()
  @IsOptional()
  public alias: string;

  @IsMongoId()
  @IsOptional()
  public readonly user: string;

  @IsMongoId()
  @IsOptional()
  public readonly workspace: string;

  @IsMongoId()
  @IsOptional()
  public readonly domain: string;

  @Type(() => CreateQrCodeDto)
  @IsOptional()
  public readonly qrCode?: CreateQrCodeDto;

  @IsBoolean()
  @IsOptional()
  public readonly enableTracking: boolean;
}
