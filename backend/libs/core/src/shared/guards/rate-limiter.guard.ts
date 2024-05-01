import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RateLimiterGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
