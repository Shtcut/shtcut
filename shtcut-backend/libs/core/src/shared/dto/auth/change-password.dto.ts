import { IsEmail, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class ChangePasswordDto {
  @Transform((s) => String(s.value).trim().toLowerCase())
  @IsEmail()
  @IsNotEmpty()
  public currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @Transform((s) => String(s).trim())
  public password: string;
}
