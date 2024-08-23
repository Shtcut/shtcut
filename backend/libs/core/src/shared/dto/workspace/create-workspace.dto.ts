import { configuration } from '@config';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateIf } from '@nestjs/class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly slug: string;

  @IsMongoId()
  @IsOptional()
  public plan: string;

  @IsString()
  @IsOptional()
  public readonly type?: string;

  @IsString()
  @IsEnum(configuration().app.modules)
  @IsNotEmpty()
  public module: string;

  @IsArray()
  @IsOptional()
  public memberEmails?: string[];

  @IsString()
  @ValidateIf((o) => o.memberEmails && o.memberEmails.length > 0)
  @IsNotEmpty()
  public redirectUrl?: string;
}
