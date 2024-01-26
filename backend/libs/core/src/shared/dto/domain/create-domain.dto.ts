import { IsMongoId, IsNotEmpty, IsString } from '@nestjs/class-validator';

export class CreateDomainDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsMongoId()
  @IsNotEmpty()
  public readonly workspace: string;
}
