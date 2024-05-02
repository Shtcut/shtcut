import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RateLimiterService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async countLimit(key: string, duration: number) {
    return this.redis.zcount(key, 0, duration);
  }

  async getFirstOfLimit(key: string, duration: number) {
    return this.redis.zcount(key, 0, duration);
  }

  async getLastOfLimit(key: string) {
    return this.redis.zrange(key, -1, -1);
  }

  async setExpire(key: string, duration: number) {
    return this.redis.expire(key, 60 * duration);
  }

  async addLimit(key: string, duration: number) {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + duration);
    await this.redis.zadd(key, 1, currentDate.getTime() / 1000);
    await this.setExpire(key, duration);
    return true;
  }

  async deleteLimit(key: string) {
    return this.redis.del(key);
  }
}
