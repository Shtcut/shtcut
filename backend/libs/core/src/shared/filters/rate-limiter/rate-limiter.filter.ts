import { RateLimiterError } from 'shtcut/core';
import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ServerResponse } from 'http';


@Catch(RateLimiterError)
export class RateLimiterFilter extends BaseExceptionFilter implements ExceptionFilter{

  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const nativeResponse: ServerResponse = response.raw || response;

    return super.catch(exception, host);
  }
}