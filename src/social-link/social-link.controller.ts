import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SocialLinkService } from './social-link.service.js';
import { JwtAuthGuard } from '../Strategy/jwt/jwt-auth.guard.js';
import { SocialLinkDto } from '../dto/social-link.dto.js';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Social Link')
@Controller('social-link')
export class SocialLinkController {
  constructor(private readonly socialLinkService: SocialLinkService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @ApiOperation({ summary: 'Create Social Link' })
  @ApiBearerAuth('access-token')
  async createSocialLink(@Body() payload: SocialLinkDto) {
    return await this.socialLinkService.createSocialLink(payload);
  }

  @Get('')
  @ApiOperation({ summary: 'Gell All Social Link' })
  async getAllSocialLinks() {
    return await this.socialLinkService.getAllSocialLinks();
  }
}
