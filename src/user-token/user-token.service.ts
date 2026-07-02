import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';

@Injectable()
export class UserTokenService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserTokenByUserId(userId: string) {
    return this.prismaService.userToken.findUnique({
      where: {
        userId,
      },
    });
  }

  async createUserToken(userId: string, hashedToken: string) {
    return this.prismaService.userToken.create({
      data: {
        userId,
        hashedToken,
      },
    });
  }

  async deleteToken(userId: string) {
    await this.prismaService.userToken.delete({
      where: {
        userId,
      },
    });
  }
}
