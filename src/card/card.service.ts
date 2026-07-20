import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { CardDto } from '../dto/card.dto.js';
import { CardCategoryService } from '../card-category/card-category.service.js';
import { RedisService } from '../lib/redis/redis.service.js';
import {
  CARD_GET_BY_SLUG,
  GET_ALL_CARD_REDIS_KEY,
  REDIS_DEFAULT_TTL,
} from '../constants/index.js';
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
    await this.redisService.del(GET_ALL_CARD_REDIS_KEY);
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
    await this.redisService.del(GET_ALL_CARD_REDIS_KEY);
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

  async getAllCard() {
    const fromRedis = await this.redisService.get(GET_ALL_CARD_REDIS_KEY);
    if (fromRedis) {
      return fromRedis as Card[];
    }
    const data = await this.prisma.card.findMany({
      include: {
        cardCategory: true,
      },
    });
    await this.redisService.set(
      GET_ALL_CARD_REDIS_KEY,
      data,
      REDIS_DEFAULT_TTL,
    );
    return data;
  }

  async getCardById(id: string) {
    const data = await this.prisma.card.findUnique({
      where: { id },
      include: { cardCategory: true },
    });
    if (!data) {
      throw new NotFoundException('Card not found');
    }
    return data;
  }
}
