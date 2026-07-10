import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileDto } from '../dto/profile.dto.js';
import { JwtAuthGuard } from '../Strategy/jwt/jwt-auth.guard.js';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @ApiOperation({ summary: 'Create profile' })
  @ApiBearerAuth('access-token')
  async createProfile(@Body() payload: ProfileDto) {
    return await this.profileService.createProfile(payload);
  }

  @Get('')
  @ApiOperation({ summary: 'Get profile' })
  async getProfile() {
    return await this.profileService.getProfile();
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @ApiOperation({ summary: 'Update profile' })
  @ApiBearerAuth('access-token')
  async updateProfile(@Body() payload: ProfileDto, @Param('id') id: string) {
    return await this.profileService.updateProfile(payload, id);
  }
}
