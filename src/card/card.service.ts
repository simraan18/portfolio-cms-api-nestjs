import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { CardDto } from '../dto/card.dto.js';
import { CardCategoryService } from '../card-category/card-category.service.js';

@Injectable()
export class CardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardCategoryService: CardCategoryService,
  ) {}

  async createCard(payload: CardDto) {
    const cardCategory = await this.cardCategoryService.getCardCategoryById(
      payload.cardCategoryId,
    );
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
    return await this.prisma.card.findMany({
      include: {
        cardCategory: true,
      },
      where: {
        slug,
      },
    });
  }
}
