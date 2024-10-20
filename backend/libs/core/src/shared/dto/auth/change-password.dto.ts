import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  public currentPassword: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
