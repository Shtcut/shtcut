import { IsArray, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class AcceptWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsString()
  @IsOptional()
  public email: string;
}
