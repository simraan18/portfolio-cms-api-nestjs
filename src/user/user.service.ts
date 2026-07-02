import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../lib/database/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByEmail(email: string) {
    if (!email) throw new BadRequestException('Email is required');
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async createUser(name: string, email: string, password: string) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
