import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from '@nestjs/class-validator';

export class VerifyEmailLinkDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public hash: string;
}
