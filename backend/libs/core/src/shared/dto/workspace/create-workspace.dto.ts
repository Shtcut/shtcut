import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsMongoId, IsOptional } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsMongoId()
  @IsOptional()
  public plan: string;

  @IsString()
  @IsNotEmpty()
  public readonly module: string;

  @IsString()
  @IsOptional()
  public readonly type?: string;
}
