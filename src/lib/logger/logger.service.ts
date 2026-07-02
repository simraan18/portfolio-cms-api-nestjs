import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger('HTTP');

  log(message: string, meta?: Record<string, unknown>) {
    this.logger.log(
      JSON.stringify({
        message,
        ...meta,
      }),
    );
  }

  error(message: string, error?: unknown) {
    this.logger.error(
      JSON.stringify({
        message,
        error,
      }),
    );
  }
}
