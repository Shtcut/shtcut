import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { IRateLimiterResponse, RateLimiterOptions } from '../types';
import { Reflector } from '@nestjs/core';
import { RateLimiterService } from 'shtcut/core/services';

@Injectable()
export class RateLimiterGuard implements CanActivate {
  constructor(
    @Inject('RateLimiterOptions') private options: RateLimiterOptions,
    @Inject('Reflector') private readonly reflector: Reflector,
    private readonly redisService: RateLimiterService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const reflectedOptions: RateLimiterOptions = this.reflector.get<RateLimiterOptions>(
      'rate-limit-options',
      context.getHandler(),
    );
    if (reflectedOptions) {
      if (reflectedOptions.points) this.options.points = reflectedOptions.points;
      if (reflectedOptions.duration) this.options.duration = reflectedOptions.duration;
      if (reflectedOptions.keyPrefix) this.options.keyPrefix = reflectedOptions.keyPrefix;
      if (reflectedOptions.errorMessage) this.options.errorMessage = reflectedOptions.errorMessage;
    }
    const { request, response } = this.httpContext(context);
    const ip = request.ip || request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    await this.responseRateLimit(request, response, reflectedOptions, ip);

    return true;
  }

  private setResponseHeaders(response, rateLimiterResponse: IRateLimiterResponse) {
    response.header('X-Rate-Limit-Remaining', rateLimiterResponse.remainingPoints);
    response.header('X-Rate-Limit-Limit', rateLimiterResponse.points);

    if (rateLimiterResponse.remainingPoints === 0) {
      const date = new Date(Number(rateLimiterResponse.beforeNext));
      response.header('Retry-After', date.toUTCString());
    } else {
      const date = new Date(Number(rateLimiterResponse.beforeNext));
      response.header('Retry-Reset', date.toUTCString());
    }
  }

  private async responseRateLimit(request, response, reflectedOptions: RateLimiterOptions, ip) {
    const duration = new Date().setMinutes(new Date().getMinutes() + reflectedOptions.duration);
    const key = `${reflectedOptions.keyPrefix}:${request.ip}`;
    const countLimit = await this.redisService.countLimit(key, duration);
    const unixTimestamp = Date.now() / 1000;
    if (!countLimit || (countLimit < reflectedOptions.points && duration / 1000 > unixTimestamp)) {
      // if the limit is not reached, the limit is added
      await this.redisService.addLimit(key, reflectedOptions.duration);
    }

    const firstOfLimit = await this.redisService.getFirstOfLimit(key);
    const firstDuration = firstOfLimit[0] as unknown as number;

    if (unixTimestamp > firstDuration) {
      // if the initial request has expired, all data will bee deleted.
      await Promise.all([
        await this.redisService.deleteLimit(key),
        await this.redisService.addLimit(key, reflectedOptions.duration),
      ]);
    }

    const lastOfResponse = await this.redisService.getLastOfLimit(key);
    const lastDuration = lastOfResponse[0] as unknown as number;

    const rateLimiterResponse: IRateLimiterResponse = {
      remainingPoints: reflectedOptions.points - countLimit,
      beforeNext: lastDuration * 1000,
      points: reflectedOptions.points,
    };

    if (countLimit >= reflectedOptions.points && unixTimestamp < lastDuration) {
      // if the limit is reached, the last of the last request is received
      this.setResponseHeaders(response, rateLimiterResponse);

      if (reflectedOptions.logger) {
        Logger.warn(`Rate limit exceeded for ip: ${ip}`, 'RateLimiterGuard');
      }
    } else {
      // if the limit is still not reached, the second of the first request is received
      const firstOfLimit = await this.redisService.getFirstOfLimit(key);
      const firstDuration = firstOfLimit[0] as unknown as number;

      rateLimiterResponse.beforeNext = firstDuration * 1000;
      this.setResponseHeaders(response, rateLimiterResponse);
    }
  }

  private httpContext(context: ExecutionContext) {
    if (this.options.framework === 'FastifyGraphql') {
      return {
        request: context.getArgByIndex(2).req,
        response: context.getArgByIndex(2).res,
      };
    } else if (this.options.framework === 'ExpressGraphql') {
      return {
        request: context.getArgByIndex(2).req,
        response: context.getArgByIndex(2).req.res,
      };
    }
    return {
      request: context.switchToHttp().getRequest(),
      response: context.switchToHttp().getResponse(),
    };
  }
}
