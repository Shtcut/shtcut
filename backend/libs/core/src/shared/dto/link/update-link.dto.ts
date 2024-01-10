import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateLinkDto {
  @IsString()
  @IsOptional()
  public readonly title: string;

  @IsString()
  @IsNotEmpty()
  public readonly originalURL: string;
}
