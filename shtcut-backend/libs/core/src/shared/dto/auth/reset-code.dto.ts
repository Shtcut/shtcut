import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, ValidateIf } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class ResetCodeDto {
  @Transform((s) => String(s.value).trim().toLowerCase())
  @ValidateIf((o) => !o.mobile)
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
