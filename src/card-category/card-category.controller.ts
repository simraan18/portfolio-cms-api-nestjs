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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('card-category')
@ApiTags('Card Category')
export class CardCategoryController {
  constructor(private cardCategoryService: CardCategoryService) {}

  @Post('')
  @ApiOperation({ summary: 'Create card category' })
  @ApiBearerAuth('access-token')
  async createCardCategory(@Body() payload: CardCategoryDto) {
    return await this.cardCategoryService.createCardCategory(payload);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all card category' })
  @ApiBearerAuth('access-token')
  async getAllCardCategories() {
    return await this.cardCategoryService.getAllCardCategories();
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update card category' })
  @ApiBearerAuth('access-token')
  async updateCardCategory(
    @Body() payload: CardCategoryDto,
    @Param('id') id: string,
  ) {
    return await this.cardCategoryService.updateCardCategory(id, payload);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get card category by id' })
  @ApiBearerAuth('access-token')
  async getCardCategoryById(@Param('id') id: string) {
    return await this.cardCategoryService.getCardCategoryById(id);
  }
}
