import { IsMongoId, IsOptional, IsString } from '@nestjs/class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public readonly firstName: string;

  @IsString()
  @IsOptional()
  public readonly lastName: string;

  @IsString()
  @IsOptional()
  public readonly gender: string;

  @IsMongoId()
  @IsOptional()
  public readonly avatar: string;
}
