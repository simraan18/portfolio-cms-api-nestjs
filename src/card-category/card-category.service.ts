import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { CardCategoryDto } from '../dto/card-category.dto.js';
import { generateSlug } from '../utils/index.js';

@Injectable()
export class CardCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCardCategory(cardCategoryDto: CardCategoryDto) {
    const slug = generateSlug(cardCategoryDto.name);
    return await this.prisma.cardCategory.create({
      data: {
        name: cardCategoryDto.name,
        description: cardCategoryDto.description,
        slug,
      },
    });
  }

  async getAllCardCategories() {
    return await this.prisma.cardCategory.findMany();
  }

  async getCardCategoryById(id: string) {
    const cardCategory = await this.prisma.cardCategory.findUnique({
      where: { id },
    });
    if (!cardCategory) {
      throw new NotFoundException('Card Category not found');
    }
    return cardCategory;
  }

  async updateCardCategory(id: string, cardCategoryDto: CardCategoryDto) {
    const cardCategory = await this.getCardCategoryById(id);
    const slug = generateSlug(cardCategoryDto.name);
    return await this.prisma.cardCategory.update({
      where: { id },
      data: {
        name: cardCategoryDto.name,
        description: cardCategoryDto.description,
        slug,
      },
    });
  }
}
