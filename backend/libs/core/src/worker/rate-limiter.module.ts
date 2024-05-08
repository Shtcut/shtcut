import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RateLimiterService } from '../services';
import { RATE_LIMITER_MODULE_PARAMS_TOKEN, RateLimiterModuleParams, rateLimiterGuardProvider } from 'shtcut/core/shared';

@Global()
@Module({})
export class RateLimiterModule {
  static forRoot(params: RateLimiterModuleParams): DynamicModule {
    const paramsProvider: Provider<RateLimiterModuleParams> = {
      provide: RATE_LIMITER_MODULE_PARAMS_TOKEN,
      useValue: params,
    }
    return {
      module: RateLimiterModule,
      providers: [
        paramsProvider,
        rateLimiterGuardProvider
      ]
    }
  }

  // static forRootAsync(options: RateLimiterModuleParams): DynamicModule {
  //   return {};
  // }
}
