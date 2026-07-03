import { Module } from '@nestjs/common';
import { CardCategoryService } from './card-category.service.js';
import { CardCategoryController } from './card-category.controller.js';

@Module({
  providers: [CardCategoryService],
  controllers: [CardCategoryController],
  exports: [CardCategoryService],
})
export class CardCategoryModule {}
