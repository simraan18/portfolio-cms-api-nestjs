import { Injectable } from '@nestjs/common';
import { ExperienceDto } from '../dto/experience.dto.js';
import { PrismaService } from '../lib/database/prisma.service.js';
import { RedisService } from '../lib/redis/redis.service.js';
import {
  EXPERIENCE_ALL_REDIS_KEY,
  REDIS_DEFAULT_TTL,
} from '../constants/index.js';
import { Experience } from 'generated/prisma/client.js';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async createExperience(payload: ExperienceDto) {
    await this.redisService.del(EXPERIENCE_ALL_REDIS_KEY);
    return await this.prisma.experience.create({
      data: {
        company: payload.company,
        role: payload.role,
        country: payload.country,
        startDate: payload.startDate,
        endDate: payload.endDate,
        isCurrent: payload.isCurrent,
      },
    });
  }

  async getAllExperiences() {
    const dataFromRedis = await this.redisService.get(EXPERIENCE_ALL_REDIS_KEY);
    if (dataFromRedis) {
      return dataFromRedis as Experience[];
    }
    const data = await this.prisma.experience.findMany({
      include: {
        responsibilities: true,
        technologies: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
    await this.redisService.set(
      EXPERIENCE_ALL_REDIS_KEY,
      data,
      REDIS_DEFAULT_TTL,
    );
    return data;
  }

  async updateExperience(id: string, payload: ExperienceDto) {
    await this.redisService.del(EXPERIENCE_ALL_REDIS_KEY);
    return await this.prisma.experience.update({
      where: { id },
      data: {
        company: payload.company,
        role: payload.role,
        country: payload.country,
        startDate: payload.startDate,
        endDate: payload.endDate,
        isCurrent: payload.isCurrent,
      },
    });
  }
}
