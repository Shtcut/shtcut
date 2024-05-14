import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { RateLimiterModuleParams } from 'shtcut/core';

export interface RateLimiterModuleParamsAsync
  extends Pick<ModuleMetadata, 'imports' | 'providers'>,
    Pick<
      FactoryProvider<
        RateLimiterModuleParams | Promise<RateLimiterModuleParams>
      >,
      'useFactory' | 'inject'
    > {
}