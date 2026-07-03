import { Injectable } from '@nestjs/common';
import { ExperienceDto } from '../dto/experience.dto.js';
import { PrismaService } from '../lib/database/prisma.service.js';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async createExperience(payload: ExperienceDto) {
    return await this.prisma.experience.create({
      data: {
        company: payload.company,
        role: payload.role,
        country: payload.country,
        startDate: payload.startDate,
        endDate: payload.endDate,
      },
    });
  }

  async getAllExperiences() {
    return await this.prisma.experience.findMany({
      include: {
        responsibilities: true,
        technologies: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
  }
}
