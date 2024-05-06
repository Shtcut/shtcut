import {SetMetadata} from '@nestjs/common';
import {RateLimiterOptions} from '../types';
import {RATE_LIMITER_PARAM_TOKEN} from "shtcut/core/shared";
import {RateLimiterParams} from "shtcut/core/shared/common/rate-limiter-params";

// @ts-ignore
export function RateLimiter(...params: RateLimiterParams[] | [false]) {
    return SetMetadata(RATE_LIMITER_PARAM_TOKEN, params)
}
