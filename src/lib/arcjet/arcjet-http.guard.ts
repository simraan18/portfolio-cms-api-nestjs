import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service.js';
import { ArcjetNodeRequest } from '@arcjet/node';
import { ArcjetHttpService } from './arcjet-http.service.js';

@Injectable()
export class ArcjetHttpGuard implements CanActivate {
  constructor(
    private readonly logger: LoggerService,
    private readonly arcjetHttpService: ArcjetHttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<ArcjetNodeRequest>();
      const decsion = await this.arcjetHttpService.protect(request);
      if (decsion.isDenied()) {
        this.logger.error('ArcjetHttpGuard Denied', { reason: decsion.reason });
        throw new ForbiddenException(decsion.reason.type);
      }
      return true;
    } catch (error) {
      this.logger.error('ArcjetHttpGuard Error', { error });
      return false;
    }
  }
}
