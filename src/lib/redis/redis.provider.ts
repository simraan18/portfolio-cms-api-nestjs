import { Redis } from 'ioredis';

export const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: () => {
    if (process.env.NODE_ENV === 'development') {
      return new Redis({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      });
    }
    return new Redis(process.env.REDIS_URL!);
  },
};
