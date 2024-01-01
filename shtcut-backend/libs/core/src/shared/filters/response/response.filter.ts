import { configuration } from '@config';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AppException, INTERNAL_SERVER_ERROR } from 'shtcut/core';
import lang from 'shtcut/core/lang';

@Catch()
export class ResponseFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: any, host: ArgumentsHost) {
    const showDeveloperError = Boolean(configuration().app.showDeveloperError);
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const meta: Record<any, any> = {};
    let code = INTERNAL_SERVER_ERROR;
    if (exception instanceof AppException || exception instanceof HttpException) {
      code = exception.getStatus();
      meta.statusCode = exception.getStatus();
      meta.error = exception.getResponse();
    } else if (exception instanceof Error) {
      code = INTERNAL_SERVER_ERROR;
      meta.error = { code, message: exception.message };
      meta.developerMessage = exception;
    } else {
      code = INTERNAL_SERVER_ERROR;
      meta.statusCode = code;
      meta.error = {
        code,
        message: lang.get('error').internalServer,
      };
      meta.developerMessage = exception;
    }
    if (!showDeveloperError) {
      delete meta.developerMessage;
    }
    response.status(code).send({ meta });
  }
}
