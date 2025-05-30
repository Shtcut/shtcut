import { IsNumber } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { getMonth } from 'date-fns';

export class AnalyticsOptionsDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly month?: number = getMonth(new Date());
}
