import { LimiterOption, LimiterInfo } from 'ratelimiter';
import {
  CreateErrorBodyFn,
  getRateLimit,
  RATE_LIMITER_MODULE_PARAMS_TOKEN, RATE_LIMITER_VALIDATOR_TOKEN, RateLimiterError,
  RateLimiterModuleParams,
  RateLimiterValidator,
} from 'shtcut/core';
import { ClassProvider, Inject, InternalServerErrorException } from '@nestjs/common';


export class RateLimiterValidatorImpl implements RateLimiterValidator {
  constructor(
    @Inject(RATE_LIMITER_MODULE_PARAMS_TOKEN)
    private readonly defaultParams: RateLimiterModuleParams,
  ) {
  }

  async validate(params: Pick<LimiterOption, 'max' | 'duration'> & { createErrorBody?: CreateErrorBodyFn; } & {
    id: string;
  }): Promise<LimiterInfo> {
    let limiterInfo: LimiterInfo;
    try {
      limiterInfo = await getRateLimit({
        id: params.id,
        db: this.defaultParams.db,
        max: params.max || this.defaultParams.max,
        duration: params.duration || this.defaultParams.duration,
      });
    } catch (err) {
      throw new InternalServerErrorException('Can not create rate limiter', String(err));
    }

    if (limiterInfo.remaining < 1) {
      const body = (
        params.createErrorBody || this.defaultParams.createErrorBody
      )(limiterInfo);
      throw new RateLimiterError(body, limiterInfo);
    }
    return limiterInfo;
  }
}


export const rateLimiterValidateProvider: ClassProvider<RateLimiterValidator> = {
  provide: RATE_LIMITER_VALIDATOR_TOKEN,
  useClass: RateLimiterValidatorImpl,
};