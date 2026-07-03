import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ResponsibilityService } from './responsibility.service.js';
import { ResponsibilityDto } from '../dto/responsibility.dto.js';
import { JwtAuthGuard } from '../Strategy/jwt/jwt-auth.guard.js';

@UseGuards(JwtAuthGuard)
@Controller('responsibility')
export class ResponsibilityController {
  constructor(private readonly responsibilityService: ResponsibilityService) {}

  @Post('/:experienceId')
  async createResponsibility(
    @Body() payload: ResponsibilityDto,
    @Param('experienceId') experienceId: string,
  ) {
    return await this.responsibilityService.createResponsibility(
      payload,
      experienceId,
    );
  }
}
