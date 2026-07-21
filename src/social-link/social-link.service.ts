import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { SocialLinkDto } from '../dto/social-link.dto.js';
import { RedisService } from '../lib/redis/redis.service.js';
import {
  SOCIAL_LINKS_ALL_REDIS_KEY,
  REDIS_DEFAULT_TTL,
} from '../constants/index.js';
import { SocialLink } from 'generated/prisma/client.js';

@Injectable()
export class SocialLinkService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async createSocialLink(payload: SocialLinkDto) {
    await this.redisService.del(SOCIAL_LINKS_ALL_REDIS_KEY);
    return await this.prisma.socialLink.create({ data: payload });
  }

  async getAllSocialLinks() {
    const dataFromRedis = await this.redisService.get(
      SOCIAL_LINKS_ALL_REDIS_KEY,
    );
    if (dataFromRedis) {
      return dataFromRedis as SocialLink[];
    }
    const data = await this.prisma.socialLink.findMany();
    await this.redisService.set(
      SOCIAL_LINKS_ALL_REDIS_KEY,
      data,
      REDIS_DEFAULT_TTL,
    );
    return data;
  }

  async updateSocialLink(payload: SocialLinkDto, id: string) {
    await this.redisService.del(SOCIAL_LINKS_ALL_REDIS_KEY);
    return await this.prisma.socialLink.update({
      where: { id },
      data: payload,
    });
  }

  async getSocialLinkById(id: string) {
    const data = await this.prisma.socialLink.findUnique({
      where: { id },
    });
    if (!data) {
      throw new NotFoundException('Social link not found');
    }
    return data;
  }
}
