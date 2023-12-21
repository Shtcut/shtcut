import { IsEmail, IsNotEmpty, ValidateIf } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class EmailDto {
  @Transform((o) => String(o.value).trim().toLowerCase())
  @ValidateIf((o) => !o.mobile)
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
