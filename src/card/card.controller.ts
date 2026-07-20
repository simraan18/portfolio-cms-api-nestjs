import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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

  @Put('/:id')
  @ApiOperation({ summary: 'Update Card' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async updateCard(@Body() payload: CardDto, @Param('id') id: string) {
    return await this.cardService.updateCard(payload, id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get All Cards' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async getAllCard() {
    return await this.cardService.getAllCard();
  }

  @Get('/card-id/:id')
  @ApiOperation({ summary: 'Get Card By Id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async getCardById(@Param('id') id: string) {
    return await this.cardService.getCardById(id);
  }
}
