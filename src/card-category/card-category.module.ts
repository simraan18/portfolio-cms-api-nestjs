import { Module } from '@nestjs/common';
import { CardCategoryService } from './card-category.service.js';
import { CardCategoryController } from './card-category.controller.js';

@Module({
  providers: [CardCategoryService],
  controllers: [CardCategoryController],
})
export class CardCategoryModule {}
