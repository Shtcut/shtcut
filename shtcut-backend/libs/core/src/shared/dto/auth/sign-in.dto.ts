import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from '@nestjs/class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  public password: string;
}
