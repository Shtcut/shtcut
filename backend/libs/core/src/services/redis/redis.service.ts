import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { Dict, InjectRedis, Redis } from 'shtcut/core';
import lang from 'shtcut/core/lang';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  /**
   * The function sets a value in Redis with an optional expiration time.
   * @param {string} key - A string representing the key to set in the Redis database.
   * @param {string | number | boolean | Dict} value - The `value` parameter can be a string, number,
   * boolean, or a dictionary (object).
   * @param {number | string} [expire] - The `expire` parameter is an optional parameter that specifies
   * the expiration time for the key-value pair in the Redis database. It can be either a number
   * representing the number of seconds until expiration, or a string in the format of
   * `<number><unit>`, where `<number>` is the duration and `<
   * @returns a Promise that resolves to a boolean value.
   */
  async set(key: string, value: string | number | boolean | Dict, expire?: number | string): Promise<boolean> {
    let result: string;
    if (_.isObject(value)) {
      result = await this.redis.set(key, Buffer.from(JSON.stringify(value)));
    } else if (_.isBoolean(value)) {
      result = await this.redis.set(key, value.toString());
    } else {
      result = await this.redis.set(key, value);
    }
    if (expire) {
      let seconds: number;
      if (_.isString(expire)) {
        const matchArray = expire.match(/(\d+)([mhd])/);
        if (!matchArray) {
          throw new Error(lang.get('redis').invalidExpire);
        }
        const [, num, unit] = matchArray;
        const multiplier: Dict<number> = {
          m: 60,
          h: 60 * 60,
          d: 24 * 60 * 60,
        };
        seconds = Math.floor(parseInt(num) * multiplier[unit]);
      } else {
        seconds = expire;
      }
      await this.redis.expire(key, seconds);
    }
    return result === 'OK';
  }

  /**
   * The `remove` function is an asynchronous function that removes multiple keys from a Redis database
   * and returns the number of keys deleted.
   * @param {string[]} keys - The `keys` parameter is a rest parameter that allows you to pass in
   * multiple string values as arguments. In this case, it represents an array of string keys that you
   * want to remove from the Redis database.
   * @returns The `remove` function is returning a `Promise<number>`.
   */
  async remove(...keys: string[]): Promise<number> {
    return this.redis.del(keys);
  }

  /**
   * The function `getAsNum` retrieves a value from Redis using a given key and returns it as a number,
   * with an optional default value if the key does not exist.
   * @param {string} key - The `key` parameter is a string that represents the key used to retrieve a
   * value from the Redis database.
   * @param {number} [defaults] - The `defaults` parameter is an optional parameter of type `number`.
   * It represents the default value that will be returned if the value retrieved from the Redis
   * database is falsy (null, undefined, empty string, etc.). If the `defaults` parameter is not
   * provided, the function will return `undefined
   * @returns a Promise that resolves to a number.
   */
  async getAsNum(key: string, defaults?: number): Promise<number> {
    const value = await this.redis.get(key);
    return !value ? defaults : +value;
  }

  /**
   * The function `getAsBool` retrieves a value from Redis and returns it as a boolean, with an optional
   * default value.
   * @param {string} key - The key parameter is a string that represents the key used to retrieve a
   * value from the Redis database.
   * @param {boolean} [defaults] - The `defaults` parameter is an optional boolean value that represents
   * the default value to be returned if the key does not exist in the Redis database or if the value is
   * not a valid boolean string.
   * @returns a boolean value.
   */
  async getAsBool(key: string, defaults?: boolean) {
    const value = await this.redis.get(key);
    return !value ? defaults : ['true', 'True', '1'].includes(value);
  }

  /**
   * The function retrieves a value from Redis using a given key and returns it as an object of type T,
   * with an optional default value.
   * @param {string} key - The `key` parameter is a string that represents the key used to retrieve the
   * value from the Redis database.
   * @param {boolean} [defaults] - The `defaults` parameter is an optional boolean value that specifies
   * whether to return a default value if the key does not exist in the Redis database. If `defaults`
   * is set to `true`, the function will return the default value specified by the caller. If
   * `defaults` is not provided or set
   * @returns a Promise that resolves to an object of type T.
   */
  async getAsObj<T>(key: string, defaults?: boolean) {
    const value = await this.redis.get(key);
    if (!value) {
      return defaults;
    }
    return JSON.parse(value) as T;
  }
}
