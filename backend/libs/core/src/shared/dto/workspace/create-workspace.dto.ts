import { configuration } from '@config';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateIf } from '@nestjs/class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public slug: string;

  @IsMongoId()
  @IsOptional()
  public plan: string;

  @IsString()
  @IsOptional()
  public readonly type?: string;

  @IsArray()
  @IsNotEmpty()
  public modules: string;

  @IsArray()
  @IsOptional()
  public memberEmails?: string[];

  @IsString()
  @ValidateIf((o) => o.memberEmails && o.memberEmails.length > 0)
  @IsNotEmpty()
  public redirectUrl?: string;
}
