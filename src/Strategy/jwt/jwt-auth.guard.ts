import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTokenService } from '../../lib/api-token/api-token.service.js';
import { UserTokenService } from '../../user-token/user-token.service.js';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorator/is-public.js';
import { LoggerService } from '../../lib/logger/logger.service.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly apiTokenService: ApiTokenService,
    private readonly userTokenService: UserTokenService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly logger: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<Request>();
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) return false;
      const [userId, key] = token.split('.');
      const userToken =
        await this.userTokenService.getUserTokenByUserId(userId);
      if (!userToken) throw new UnauthorizedException();
      const jwt = await this.apiTokenService.verifyToken(key, userToken);
      if (!jwt) throw new UnauthorizedException();
      const payload = await this.jwtService.verifyAsync(jwt);
      request.user = {
        userId: payload.sub,
        email: payload.email,
      };
      return true;
    } catch (error) {
      this.logger.error((error as any)?.message);
      throw new UnauthorizedException();
    }
  }
}
