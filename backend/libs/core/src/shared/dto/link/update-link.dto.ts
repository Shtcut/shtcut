import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateLinkDto {
  @IsString()
  @IsOptional()
  public readonly title: string;

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
  public readonly alias: string;
}
