import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TechnologyService } from './technology.service.js';
import { TechnologyDto } from '../dto/technology.dto.js';
import { JwtAuthGuard } from '../Strategy/jwt/jwt-auth.guard.js';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('technology')
@ApiTags('Technology')
@ApiBearerAuth('access-token')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post('/:experienceId')
  @ApiOperation({ summary: 'Create Technology' })
  async createTechnology(
    @Param('experienceId') experienceId: string,
    @Body() payload: TechnologyDto,
  ) {
    return await this.technologyService.createTechnology(payload, experienceId);
  }
}
