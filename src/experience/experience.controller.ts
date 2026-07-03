import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExperienceDto } from '../dto/experience.dto.js';
import { ExperienceService } from './experience.service.js';
import { JwtAuthGuard } from '../Strategy/jwt/jwt-auth.guard.js';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('experience')
@ApiTags('Experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create experience' })
  async createExperience(@Body() payload: ExperienceDto) {
    return await this.experienceService.createExperience(payload);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all experience' })
  async getAllExperiences() {
    return await this.experienceService.getAllExperiences();
  }
}
