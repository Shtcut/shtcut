import { configuration } from '@config';
import { RateLimiterOptions } from '../types';

export const rateLimiterOptions: RateLimiterOptions = {
  framework: 'Express',
  redis: {
    host: configuration().app.redis.host || 'localhost',
    port: configuration().app.redis.port || 6379,
  },
  keyPrefix: 'global',
  points: 4,
  duration: 1,
  errorMessage: 'Rate limit exceeded',
};
