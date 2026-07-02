import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CardCategoryService } from './card-category.service.js';
import { JwtAuthGuard } from '../Strategy/jwt/jwt-auth.guard.js';
import { CardCategoryDto } from '../dto/card-category.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('card-category')
export class CardCategoryController {
  constructor(private cardCategoryService: CardCategoryService) {}

  @Post('/')
  async createCardCategory(@Body() payload: CardCategoryDto) {
    return await this.cardCategoryService.createCardCategory(payload);
  }

  @Get('/')
  async getAllCardCategories() {
    return await this.cardCategoryService.getAllCardCategories();
  }

  @Put('/:id')
  async updateCardCategory(
    @Body() payload: CardCategoryDto,
    @Param('id') id: string,
  ) {
    return await this.cardCategoryService.updateCardCategory(id, payload);
  }
}
