import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { ResponsibilityDto } from '../dto/responsibility.dto.js';
import { RedisService } from '../lib/redis/redis.service.js';
import { EXPERIENCE_ALL_REDIS_KEY } from '../constants/index.js';

@Injectable()
export class ResponsibilityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async createResponsibility(payload: ResponsibilityDto, experienceId: string) {
    await this.redisService.del(EXPERIENCE_ALL_REDIS_KEY);
    return await this.prisma.responsibility.create({
      data: {
        content: payload.content,
        experienceId,
      },
    });
  }

  async updateResponsibility(payload: ResponsibilityDto, id: string) {
    await this.redisService.del(EXPERIENCE_ALL_REDIS_KEY);
    return await this.prisma.responsibility.update({
      where: { id },
      data: {
        content: payload.content,
      },
    });
  }
}
