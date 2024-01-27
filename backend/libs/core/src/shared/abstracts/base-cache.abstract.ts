import { RedisClientType } from 'redis';
import { CacheKeyArgument, CacheKeyValue, CacheValueArgument } from 'shtcut/core';

export abstract class BaseCache<T = RedisClientType> {
  /* The line `abstract client: T;` is declaring an abstract property named `client` in the `BaseCache`
  class. The property has a type `T`, which is a generic type parameter. This means that the
  specific type of `client` will be determined by the subclasses of `BaseCache`. The purpose of this
  property is to hold the client object or connection to the cache server, which will be used by the
  methods in the `BaseCache` class and its subclasses to interact with the cache server. */
  abstract client: T;

  /* The `abstract isConnected(): Promise<void>;` method is declaring an abstract method named
  `isConnected` in the `BaseCache` class. */
  abstract isConnected(): Promise<void>;

  /* The `abstract connect(): Promise<T>;` method is declaring an abstract method named `connect` in
  the `BaseCache` class. This method is responsible for establishing a connection to the cache
  server and returning a promise that resolves to a value of type `T`. The specific implementation
  of this method will be provided by the subclasses of `BaseCache`. */
  abstract connect(): Promise<T>;

  /* The `abstract set(key: CacheKeyArgument, value: CacheValueArgument, config: unknown):
  Promise<void>;` method is declaring an abstract method named `set` in the `BaseCache` class. This
  method is responsible for setting a value in the cache server with the specified key and value.
  The `config` parameter is used to provide additional configuration options for the set operation.
  The method returns a promise that resolves to `void`, indicating that the set operation has been
  completed. The specific implementation of this method will be provided by the subclasses of
  `BaseCache`. */
  abstract set(key: CacheKeyArgument, value: CacheValueArgument, config: unknown): Promise<void>;

  /* The `abstract remove(key: CacheKeyArgument): Promise<void>;` method is declaring an abstract
  method named `remove` in the `BaseCache` class. This method is responsible for removing a value
  from the cache server with the specified key. The `key` parameter is used to identify the value to
  be removed. The method returns a promise that resolves to `void`, indicating that the remove
  operation has been completed. The specific implementation of this method will be provided by the
  subclasses of `BaseCache`. */

  /* The `abstract remove(key: CacheKeyArgument): Promise<void>;` method is declaring an abstract
  method named `remove` in the `BaseCache` class. This method is responsible for removing a value
  from the cache server with the specified key. The `key` parameter is used to identify the value to
  be removed. The method returns a promise that resolves to `void`, indicating that the remove
  operation has been completed. The specific implementation of this method will be provided by the
  subclasses of `BaseCache`. */
  abstract remove(key: CacheKeyArgument): Promise<void>;

  /* The `abstract get(key: CacheKeyArgument): Promise<unknown>;` method is declaring an abstract method
  named `get` in the `BaseCache` class. This method is responsible for retrieving a value from the
  cache server with the specified key. The `key` parameter is used to identify the value to be
  retrieved. The method returns a promise that resolves to `void`, indicating that the get operation
  has been completed. The specific implementation of this method will be provided by the subclasses
  of `BaseCache`. */
  abstract get(key: CacheKeyArgument): Promise<unknown>;

  /* The `abstract setMulti(keys: CacheKeyValue[]): Promise<void>` method is declaring an abstract
  method named `setMulti` in the `BaseCache` class. This method is responsible for setting multiple
  values in the cache server with the specified keys and values. The `keys` parameter is an array of
  cache keys, and the method is expected to set the corresponding values in the cache server. The
  method returns a promise that resolves to `void`, indicating that the set operation has been
  completed. The specific implementation of this method will be provided by the subclasses of
  `BaseCache`. */
  abstract setMulti(fields: CacheKeyValue[]): Promise<void>;

  /* The `abstract pExpire(key: CacheKeyArgument, millisecond): Promise<void>;` method is declaring an
  abstract method named `pExpire` in the `BaseCache` class. This method is responsible for setting
  an expiration time (in milliseconds) for a key in the cache server. The `key` parameter is used to
  identify the key for which the expiration time needs to be set, and the `millisecond` parameter
  specifies the duration of the expiration time in milliseconds. The method returns a promise that
  resolves to `void`, indicating that the expiration time has been set successfully. The specific
  implementation of this method will be provided by the subclasses of `BaseCache`. */
  abstract pExpire(key: CacheKeyArgument, millisecond): Promise<void>;

  /* The `abstract hashGet(key: CacheKeyArgument, field: CacheKeyArgument): Promise<unknown |
  unknown[]>;` method is declaring an abstract method named `hashGet` in the `BaseCache` class. This
  method is responsible for retrieving the value of a specific field from a hash stored in the cache
  server. */
  abstract hashGet(key: CacheKeyArgument, field: CacheKeyArgument): Promise<unknown | unknown[]>;

  /* The `abstract hashSet` method is declaring an abstract method named `hashSet` in the `BaseCache`
  class. This method is responsible for setting a field-value pair in a hash stored in the cache
  server. */
  abstract hashSet(key: CacheKeyArgument, field: CacheKeyArgument, value: CacheValueArgument): Promise<number>;

  /* The `abstract hashGetAll(key: CacheKeyArgument): Promise<unknown | unknown[]>;` method is
  declaring an abstract method named `hashGetAll` in the `BaseCache` class. This method is
  responsible for retrieving all the fields and values from a hash stored in the cache server. */
  abstract hashGetAll(key: CacheKeyArgument): Promise<unknown | unknown[]>;
}
