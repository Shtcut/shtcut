import { Catch, Logger, RpcExceptionFilter } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AppException } from '../app-exception';

@Catch(AppException)
export class WorkerExceptionFilter implements RpcExceptionFilter {
  catch(exception: AppException): Observable<any> {
    Logger.error('worker-exception:::', exception);
    return of(exception.getResponse());
  }
}
