import {ServerResponse} from 'http';
import * as _ from "lodash";
import {LimiterInfo} from "ratelimiter";

export function setHeaders(response: ServerResponse, limiterInfo: LimiterInfo) {
    const previousRemaining = response.getHeader('X-RateLimit-Remaining');

    if (_.isNumber(previousRemaining) && previousRemaining < limiterInfo.remaining) return;

    response.setHeader('X-RateLimit-Limit', limiterInfo.total);
    response.setHeader('X-RateLimit-Remaining', limiterInfo.remaining);
    response.setHeader('X-RateLimit-Reset', limiterInfo.reset);
}