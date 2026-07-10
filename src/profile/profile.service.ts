import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { ProfileDto } from '../dto/profile.dto.js';
import { RedisService } from '../lib/redis/redis.service.js';
import { PROFILE_REDIS_KEY, REDIS_DEFAULT_TTL } from '../constants/index.js';
import { Profile } from 'generated/prisma/client.js';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async createProfile(payload: ProfileDto) {
    await this.redisService.del(PROFILE_REDIS_KEY);
    return await this.prisma.profile.create({
      data: {
        ...payload,
      },
    });
  }

  async getProfile() {
    const dataFromRedis = await this.redisService.get(PROFILE_REDIS_KEY);
    if (dataFromRedis) {
      return dataFromRedis as Profile;
    }
    const data = await this.prisma.profile.findFirst();
    await this.redisService.set(PROFILE_REDIS_KEY, data, REDIS_DEFAULT_TTL);
    return data;
  }

  async updateProfile(payload: ProfileDto, id: string) {
    await this.redisService.del(PROFILE_REDIS_KEY);
    return await this.prisma.profile.update({
      where: { id },
      data: {
        ...payload,
      },
    });
  }
}
