import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsMongoId, IsOptional } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsMongoId()
  @IsNotEmpty()
  public readonly plan: string;

  @IsString()
  @IsOptional()
  public readonly type?: string;
}