import { FactoryProvider, ModuleMetadata, Type } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';

export { Redis };

export interface RedisModuleOptions extends RedisOptions {
  url?: string;
}

export interface RedisModuleOptionsFactory {
  createRedisModuleOptions(): Promise<RedisModuleOptions> | RedisModuleOptions;
}

export interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Existing provider to be used
   */
  useExisting?: Type<RedisModuleOptionsFactory>;

  /**
   * Type (class name) of provider (instance to be registered and injected)
   */
  useClass?: Type<RedisModuleOptionsFactory>;

  /**
   * Factory function that returns an instance of the provider to be injected
   */
  useFactory?: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions;

  /**
   * Optional list of providers to be injected into the context of the factory function
   */
  inject?: FactoryProvider['inject'];
}
