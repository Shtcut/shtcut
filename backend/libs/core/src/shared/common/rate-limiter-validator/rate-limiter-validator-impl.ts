import { LimiterOption, LimiterInfo } from 'ratelimiter';
import { CreateErrorBodyFn, RateLimiterValidator } from 'shtcut/core';


export class RateLimiterValidatorImpl implements RateLimiterValidator {
  
  validate(params: Pick<LimiterOption, 'max' | 'duration'> & { createErrorBody?: CreateErrorBodyFn; } & {
    id: string;
  }): Promise<LimiterInfo> {
    throw new Error('Method not implemented.');
  }

}