import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import {
  REDIS_CLIENT,
  REDIS_MODULE_OPTIONS,
  Redis,
  RedisModuleAsyncOptions,
  RedisModuleOptions,
  RedisModuleOptionsFactory,
  RedisService,
} from 'shtcut/core';

@Module({})
export class RedisModule {
  static forRoot(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      global: true,
      providers: [
        {
          provide: REDIS_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: REDIS_CLIENT,
          useFactory: () => {
            return this.createRedisClient(options);
          },
        },
        RedisService,
      ],
      exports: [REDIS_CLIENT, RedisService],
    };
  }

  private static createRedisClient(options: RedisModuleOptions) {
    const { url, ...rest } = options;
    if (url) {
      return new Redis(url, rest);
    }
    return new Redis(options);
  }

  static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      global: true,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: REDIS_CLIENT,
          useFactory: (options: RedisModuleOptions) => {
            return this.createRedisClient(options);
          },
          inject: [REDIS_MODULE_OPTIONS],
        },
        RedisService,
      ],
      exports: [REDIS_CLIENT, RedisService],
    };
  }

  private static createAsyncProviders(options: RedisModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<RedisModuleOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(asyncOptions: RedisModuleAsyncOptions): Provider {
    if (asyncOptions.useFactory) {
      return {
        provide: REDIS_MODULE_OPTIONS,
        useFactory: asyncOptions.useFactory,
        inject: asyncOptions.inject || [],
      };
    }
    return {
      provide: REDIS_MODULE_OPTIONS,
      useFactory: async (optionFactory: RedisModuleOptionsFactory) => optionFactory.createRedisModuleOptions(),
      inject: [(asyncOptions.useClass || asyncOptions.useExisting) as Type<RedisModuleOptionsFactory>],
    };
  }
}
