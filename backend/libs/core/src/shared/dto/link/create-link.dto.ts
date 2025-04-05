import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { CreateQrCodeDto } from '../qrcode';
import { Dict } from '../../types';
import { CreateTagDto } from '../tags';

export class CreateLinkDto {
  @IsString()
  @IsOptional()
  public readonly title: string;

  @IsString()
  @IsOptional()
  public readonly workspace: string;

  @IsString()
  @IsOptional()
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
  public readonly domain: string;

  @Type(() => CreateQrCodeDto)
  @IsOptional()
  public readonly qrCode?: CreateQrCodeDto;

  @IsArray()
  @IsOptional()
  public tags: string[];

  @IsBoolean()
  @IsOptional()
  public readonly enableTracking: boolean;

  @IsBoolean()
  @IsOptional()
  public metadata: any;
}
