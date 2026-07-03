import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
}
