import { IsEmail, IsNotEmpty, IsString, IsUrl, MaxLength, MinLength, ValidateIf } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @Transform((o) => String(o.value).trim().toLowerCase())
  @ValidateIf((o) => !o.mobile)
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  public password: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public verifyRedirectUrl: string;
}
