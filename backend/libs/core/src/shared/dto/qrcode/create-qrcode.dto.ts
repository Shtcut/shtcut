import { IsMongoId, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { QrCodeProps } from '../../types';
import { Type } from 'class-transformer';

class QrCodePropClass {
  public readonly value: string;
  public readonly bgColor?: string;
  public readonly patternColor?: string;
  public readonly fgColor?: string;
  public readonly logoImage?: string;
  public readonly eye_color_2_outer?: string;
  public readonly eye_color_0_outer?: string;
  public readonly eye_color_0_inner?: string;
  public readonly eye_color1_inner?: string;
  public readonly eye_color_2_Inner?: string;
  public readonly logoPadding?: string;
  public readonly logoWidth?: string;
  public readonly qrStyle?: string;
}

export class CreateQrCodeDto {
  @IsString()
  @IsNotEmpty()
  public readonly target: string;

  @IsString()
  @IsNotEmpty()
  public readonly alias: string;

  @IsString()
  @IsOptional()
  public readonly title: string;

  @IsOptional()
  @Type(() => QrCodePropClass)
  public readonly properties: QrCodeProps;

  @IsOptional()
  @IsMongoId()
  public readonly logo: string;
}
