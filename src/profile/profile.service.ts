import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { ProfileDto } from '../dto/profile.dto.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(payload: ProfileDto) {
    return await this.prisma.profile.create({
      data: {
        ...payload,
      },
    });
  }

  async getProfile() {
    return await this.prisma.profile.findFirst();
  }
}
