import { Module } from '@nestjs/common';
import { CardService } from './card.service.js';
import { CardController } from './card.controller.js';
import { CardCategoryModule } from '../card-category/card-category.module.js';

@Module({
  providers: [CardService],
  controllers: [CardController],
  imports: [CardCategoryModule],
})
export class CardModule {}
