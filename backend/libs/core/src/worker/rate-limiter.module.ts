import { DynamicModule, Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RateLimiterOptions, rateLimiterOptions } from '../shared';
import { RateLimiterService } from '../services';

@Module({
  exports: ['RateLimiterOptions'],
  providers: [{ provide: 'RateLimiterOptions', useValue: rateLimiterOptions }],
})
export class RateLimiterModule {
  static forRoot(options: RateLimiterOptions = rateLimiterOptions): DynamicModule {
    return {
      imports: [
        RedisModule.forRoot({
          config: {
            host: options.redis.host,
            port: options.redis.port,
          },
        }),
      ],
      module: RateLimiterModule,
      providers: [{ provide: 'RateLimiterOptions', useValue: options }],
      exports: [RateLimiterService],
    };
  }

  static forRootAsync(options: RateLimiterOptions = rateLimiterOptions): DynamicModule {
    return {
      imports: [
        RedisModule.forRootAsync({
          useFactory: () => ({
            config: {
              host: options.redis.host,
              port: options.redis.port,
            },
          }),
        }),
      ],
      module: RateLimiterModule,
      providers: [{ provide: 'RateLimiterOptions', useValue: options }],
      exports: [RateLimiterService],
    };
  }
}
