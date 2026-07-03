import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';
import { SocialLinkDto } from 'src/dto/social-link.dto.js';

@Injectable()
export class SocialLinkService {
  constructor(private readonly prisma: PrismaService) {}

  async createSocialLink(payload: SocialLinkDto) {
    return await this.prisma.socialLink.create({ data: payload });
  }

  async getAllSocialLinks() {
    return await this.prisma.socialLink.findMany();
  }
}
