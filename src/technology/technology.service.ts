import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { TechnologyDto } from '../dto/technology.dto.js';

@Injectable()
export class TechnologyService {
  constructor(private readonly prisma: PrismaService) {}

  async createTechnology(payload: TechnologyDto, experienceId: string) {
    return await this.prisma.technology.create({
      data: {
        name: payload.name,
        experienceId,
      },
    });
  }
}
