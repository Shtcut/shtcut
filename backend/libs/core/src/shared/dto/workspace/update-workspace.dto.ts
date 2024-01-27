import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsOptional } from 'class-validator';

export class UpdateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public readonly type?: string;
}
