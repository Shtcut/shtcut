import { IsEmail, IsNotEmpty, IsString, ValidateIf } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class PasswordResetDto {
  @Transform((s) => String(s.value).trim().toLowerCase())
  @ValidateIf((o) => !o.mobile)
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public resetPasswordCode: string;

  @IsString()
  @IsNotEmpty()
  @Transform((s) => String(s).trim())
  public password: string;
}
