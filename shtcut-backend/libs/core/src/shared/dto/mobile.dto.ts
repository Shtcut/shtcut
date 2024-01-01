import { IsString } from '@nestjs/class-validator';

export class MobileDto {
  @IsString()
  public readonly phoneNumber: string;

  @IsString()
  public readonly isoCode: string;
}
