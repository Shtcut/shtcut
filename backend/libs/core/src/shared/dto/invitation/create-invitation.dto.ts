import { IsArray, isArray, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  @IsArray()
  readonly emails: string[];

  @IsNotEmpty()
  @IsString()
  readonly redirectLink: string;

  @IsNotEmpty()
  @IsOptional()
  readonly token?: string;

  @IsString()
  @IsNotEmpty()
  readonly workspace: string;
}
