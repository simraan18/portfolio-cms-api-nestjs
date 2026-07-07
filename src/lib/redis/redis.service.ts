import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { LoggerService } from '../logger/logger.service.js';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
    private readonly logger: LoggerService,
  ) {}

  async set(key: string, value: unknown, ttl?: number) {
    const data = JSON.stringify(value);
    if (ttl) {
      await this.redis.set(key, data, 'EX', ttl);
    } else {
      await this.redis.set(key, data);
    }
    this.logger.log('Redis set', { key, value });
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    this.logger.log('Redis get', { key, value });
    return value ? JSON.parse(value) : null;
  }

  async del(key: string) {
    await this.redis.del(key);
    this.logger.log('Redis del', { key });
  }
}
