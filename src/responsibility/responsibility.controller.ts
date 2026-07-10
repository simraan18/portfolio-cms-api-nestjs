import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ResponsibilityService } from './responsibility.service.js';
import { ResponsibilityDto } from '../dto/responsibility.dto.js';
import { JwtAuthGuard } from '../Strategy/jwt/jwt-auth.guard.js';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('responsibility')
@ApiTags('Responsibility')
@ApiBearerAuth('access-token')
export class ResponsibilityController {
  constructor(private readonly responsibilityService: ResponsibilityService) {}

  @Post('/:experienceId')
  @ApiOperation({ summary: 'Create responsibility' })
  async createResponsibility(
    @Body() payload: ResponsibilityDto,
    @Param('experienceId') experienceId: string,
  ) {
    return await this.responsibilityService.createResponsibility(
      payload,
      experienceId,
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update responsibility' })
  async updateResponsibility(
    @Body() payload: ResponsibilityDto,
    @Param('id') id: string,
  ) {
    return await this.responsibilityService.updateResponsibility(payload, id);
  }
}
