import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardDto } from '../dto/card.dto.js';
import { CardService } from './card.service.js';
import { JwtAuthGuard } from '../Strategy/jwt/jwt-auth.guard.js';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('')
  @ApiOperation({ summary: 'Create Card' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async createCard(@Body() payload: CardDto) {
    return await this.cardService.createCard(payload);
  }

  @Get('/:slug')
  @ApiOperation({ summary: 'Get Cards By Slug' })
  async getCardsBySlug(@Param('slug') slug: string) {
    return await this.cardService.getCardsBySlug(slug);
  }
}
