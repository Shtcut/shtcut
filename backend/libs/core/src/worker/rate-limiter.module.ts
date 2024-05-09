import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  RATE_LIMITER_MODULE_PARAMS_TOKEN,
  RateLimiterModuleParams,
  rateLimiterGuardProvider,
  rateLimiterProvider,
} from 'shtcut/core';

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
        rateLimiterGuardProvider,
        rateLimiterProvider,
      ]
    }
  }

  // static forRootAsync(options: RateLimiterModuleParams): DynamicModule {
  //   return {};
  // }
}
