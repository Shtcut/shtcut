import { AppException, RateLimiterError, setHeaders } from 'shtcut/core';
import { APP_FILTER, BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, ClassProvider, ExceptionFilter } from '@nestjs/common';
import { ServerResponse } from 'http';


@Catch(RateLimiterError)
export class RateLimiterFilter extends BaseExceptionFilter implements ExceptionFilter {

  catch(exception: RateLimiterError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const nativeResponse: ServerResponse = response.raw || response;

    setHeaders(nativeResponse, exception.limiterInfo);
    nativeResponse.setHeader('Retry-After', (exception.limiterInfo.reset - Date.now() / 1000) | 0);
    return super.catch(AppException.TOO_MANY_REQUEST(exception.message), host);
  }
}

export const rateLimiterProvider: ClassProvider<ExceptionFilter> = {
  provide: APP_FILTER,
  useClass: RateLimiterFilter,
};