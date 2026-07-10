import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
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

  @Put('/:id')
  @ApiOperation({ summary: 'Update Technology' })
  async updateTechnology(
    @Param('id') id: string,
    @Body() payload: TechnologyDto,
  ) {
    return await this.technologyService.updateTechnology(payload, id);
  }
}
