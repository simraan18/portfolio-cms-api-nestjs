import { Global, Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider.js';
import { RedisService } from './redis.service.js';

@Global()
@Module({
  providers: [RedisProvider, RedisService],
  exports: [RedisProvider, RedisService],
})
export class RedisModule {}
