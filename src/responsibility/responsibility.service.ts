import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { ResponsibilityDto } from '../dto/responsibility.dto.js';

@Injectable()
export class ResponsibilityService {
  constructor(private readonly prisma: PrismaService) {}

  async createResponsibility(payload: ResponsibilityDto, experienceId: string) {
    return await this.prisma.responsibility.create({
      data: {
        content: payload.content,
        experienceId,
      },
    });
  }
}
