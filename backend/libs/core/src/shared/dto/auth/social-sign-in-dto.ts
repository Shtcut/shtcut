import { IsEnum, IsString } from '@nestjs/class-validator';

export class SocialSignInDto {
  @IsString()
  @IsEnum(['facebook', 'google', 'apple', 'github', 'twitter'])
  public socialType: string;

  @IsString()
  public accessToken: string;
}
