import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateWorkspaceDto {
  @IsString()
  @IsOptional()
  public readonly name: string;

  @IsMongoId()
  @IsOptional()
  public plan: string;

  @IsString()
  @IsOptional()
  public readonly module: string;

  @IsString()
  @IsOptional()
  public readonly type?: string;
}
