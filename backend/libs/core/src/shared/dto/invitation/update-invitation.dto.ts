import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from '@nestjs/class-validator';

export class UpdateInvitationDto {

  @IsNotEmpty()
  @IsArray()
  readonly emails: string[];

  @IsString()
  @IsNotEmpty()
  readonly workspace: string;

}
