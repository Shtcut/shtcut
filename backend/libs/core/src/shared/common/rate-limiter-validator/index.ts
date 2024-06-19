import { RateLimiterParams, RequiredField } from 'shtcut/core';
import { LimiterInfo } from 'ratelimiter';

export interface RateLimiterValidator {
  /**
   * The validator validate the request is not rate limited.
   * If the request is rate limited, throws an exception. Otherwise, returns the limiter info
   * @param params The parameters for the rate limiter
   * @returns The limiter info
   * @throws `RateLimiterError` If the request is rate limited
   * */
  validate(params: RequiredField<RateLimiterParams, 'id'>): Promise<LimiterInfo>;
}

export class RateLimiterError extends Error {
  constructor(message: unknown, readonly limiterInfo: LimiterInfo) {
    super(JSON.stringify(message));
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
