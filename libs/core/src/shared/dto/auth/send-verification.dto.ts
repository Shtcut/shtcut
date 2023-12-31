import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUrl, ValidateIf, ValidateNested } from '@nestjs/class-validator';
import { Transform, Type } from 'class-transformer';
import { MobileDto } from '../mobile.dto';

export class SendVerificationDto {
  @Transform((o) => String(o.value).trim().toLowerCase())
  @ValidateIf((o) => !o.mobile)
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ValidateNested({ message: 'invalid mobile number' })
  @ValidateIf((o) => !o.email)
  @Type(() => MobileDto)
  @IsNotEmpty()
  public readonly: MobileDto;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['mobile', 'email', 'resetPassword'])
  public type: string;
}
