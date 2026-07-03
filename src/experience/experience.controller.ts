import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExperienceDto } from '../dto/experience.dto.js';
import { ExperienceService } from './experience.service.js';
import { JwtAuthGuard } from '../Strategy/jwt/jwt-auth.guard.js';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async createExperience(@Body() payload: ExperienceDto) {
    return await this.experienceService.createExperience(payload);
  }

  @Get('')
  async getAllExperiences() {
    return await this.experienceService.getAllExperiences();
  }
}
