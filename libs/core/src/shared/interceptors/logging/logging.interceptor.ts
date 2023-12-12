import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { url, method, params, query } = request;
    this.logger.log(
      `Before: ${method} ${url} with: params: ${JSON.stringify(params)}, with query: ${JSON.stringify(query)}`,
    );
    const now = Date.now();
    return next.handle().pipe(tap(() => this.logger.log(`After: ${method} ${url} took ${Date.now() - now}ms`)));
  }
}
