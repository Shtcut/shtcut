import { configuration } from '@config';
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

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
}
