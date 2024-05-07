import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  RATE_LIMITER_MODULE_PARAMS_TOKEN, RATE_LIMITER_PARAM_TOKEN,
  RATE_LIMITER_DECORATION_TOKEN,
  RATE_LIMITER_VALIDATOR_TOKEN,
  RateLimiterParams,
  RateLimiterValidator, setHeaders, RateLimiterError, AppException, Utils,
} from 'shtcut/core';
import { ServerResponse } from 'http';
import lang from 'shtcut/core/lang';

@Injectable()
export class RateLimiterGuard implements CanActivate {
  constructor(
    @Inject(RATE_LIMITER_MODULE_PARAMS_TOKEN) private readonly rateLimiterParams: RateLimiterParams,
    @Inject(RATE_LIMITER_VALIDATOR_TOKEN) private readonly rateLimiterValidator: RateLimiterValidator,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const paramsList = this.reflector.getAllAndOverride<RateLimiterParams[] | [false] | undefined>
    (RATE_LIMITER_DECORATION_TOKEN, [context.getHandler(), context.getClass()]);

    if (Utils.isTurnedOff(paramsList)) return true;

    const response = context.switchToHttp().getResponse();

    const nativeResponse: ServerResponse = response.raw || response;

    for (const param of paramsList || [{}]) {
      await this.checkingSingleParam(param, context, nativeResponse);
    }
    return true;
  }

  private async checkingSingleParam(params: RateLimiterParams, context: ExecutionContext, response: ServerResponse) {
    const id = await this.getId(params, context);
    if (!id) return;

    const { max, duration, createErrorBody } = params;
    try {
      const limit = await this.rateLimiterValidator.validate({
        id,
        max,
        duration,
        createErrorBody,
      });
      setHeaders(response, limit);
    } catch (err) {
      if (err instanceof RateLimiterError) {
        response.setHeader('Retry-After', (err.limiterInfo.reset - Date.now() / 1000) | 0);
        setHeaders(response, err.limiterInfo);
        throw AppException.TOO_MANY_REQUEST(err.message);
      } else throw err;
    }
  }

  private async getId(params: RateLimiterParams, context: ExecutionContext) {
    let id: string | undefined = undefined;
    try {
      if ('id' in params) {
        id = params.id;
      } else if ('getId' in params) {
        id = await params.getId(context);
      } else {
        const rateLimiterParams = this.rateLimiterParams;
        if ('id' in rateLimiterParams) {
          id = rateLimiterParams.id;
        } else if ('getId' in rateLimiterParams && rateLimiterParams.getId) {
          id = await rateLimiterParams.getId(context);
        }
      }
    } catch (e) {
      const errorMessage = lang.get('error').internalServer;
      throw new InternalServerErrorException(errorMessage, String(e));
    }
    return id;
  }
}

