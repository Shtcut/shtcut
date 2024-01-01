import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from '@nestjs/class-validator';

export class VerifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public verificationCode: string;
}
