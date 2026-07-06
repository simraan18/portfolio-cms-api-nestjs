import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { TechnologyDto } from '../dto/technology.dto.js';
import { RedisService } from '../lib/redis/redis.service.js';
import { EXPERIENCE_ALL_REDIS_KEY } from '../constants/index.js';

@Injectable()
export class TechnologyService {
  constructor(
    private readonly prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  async createTechnology(payload: TechnologyDto, experienceId: string) {
    await this.redisService.del(EXPERIENCE_ALL_REDIS_KEY);
    return await this.prisma.technology.create({
      data: {
        name: payload.name,
        experienceId,
      },
    });
  }
}
