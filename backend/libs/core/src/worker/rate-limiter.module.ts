import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  RATE_LIMITER_MODULE_PARAMS_TOKEN,
  RateLimiterModuleParams,
  rateLimiterGuardProvider,
  rateLimiterProvider, RateLimiterModuleParamsAsync,
} from 'shtcut/core';
import {
  rateLimiterValidateProvider
} from 'shtcut/core/shared/common/rate-limiter-validator/rate-limiter-validator-impl';

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
        rateLimiterValidateProvider,
      ],
      exports: [rateLimiterValidateProvider]
    }
  }

  static forRootAsync(options: RateLimiterModuleParamsAsync): DynamicModule {
    const paramsProvider: Provider<RateLimiterModuleParams> = {
      provide: RATE_LIMITER_MODULE_PARAMS_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject,
    };
    return {
      module: RateLimiterModule,
      imports: options.imports,
      providers: [
        rateLimiterGuardProvider,
        rateLimiterProvider,
        rateLimiterValidateProvider,
      ],
      exports: [rateLimiterValidateProvider]
    }
  }
}
