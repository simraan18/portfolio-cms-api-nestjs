import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { CardDto } from '../dto/card.dto.js';
import { CardCategoryService } from '../card-category/card-category.service.js';
import { RedisService } from '../lib/redis/redis.service.js';
import { CARD_GET_BY_SLUG, REDIS_DEFAULT_TTL } from '../constants/index.js';
import { Card } from 'generated/prisma/client.js';

@Injectable()
export class CardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardCategoryService: CardCategoryService,
    private readonly redisService: RedisService,
  ) {}

  async createCard(payload: CardDto) {
    const cardCategory = await this.cardCategoryService.getCardCategoryById(
      payload.cardCategoryId,
    );
    await this.redisService.del(CARD_GET_BY_SLUG(cardCategory.slug));
    return await this.prisma.card.create({
      data: {
        description: payload.description,
        slug: cardCategory.slug,
        title: payload.title,
        cardCategory: {
          connect: {
            id: payload.cardCategoryId,
          },
        },
      },
    });
  }

  async getCardsBySlug(slug: string) {
    const dataFromRedis = await this.redisService.get(CARD_GET_BY_SLUG(slug));
    if (dataFromRedis) {
      return dataFromRedis as Card[];
    }
    const data = await this.prisma.card.findMany({
      include: {
        cardCategory: true,
      },
      where: {
        slug,
      },
    });
    await this.redisService.set(
      CARD_GET_BY_SLUG(slug),
      data,
      REDIS_DEFAULT_TTL,
    );
    return data;
  }

  async updateCard(payload: CardDto, id: string) {
    const cardCategory = await this.cardCategoryService.getCardCategoryById(
      payload.cardCategoryId,
    );
    await this.redisService.del(CARD_GET_BY_SLUG(cardCategory.slug));
    return await this.prisma.card.update({
      where: { id },
      data: {
        cardCategoryId: cardCategory.id,
        description: payload.description,
        slug: cardCategory.slug,
        title: payload.title,
      },
      include: { cardCategory: true },
    });
  }
}
