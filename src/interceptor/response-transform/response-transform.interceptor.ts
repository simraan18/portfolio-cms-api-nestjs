import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    const requestId = crypto.randomUUID();
    return next.handle().pipe(
      map((data: T) => ({
        statusCode: response.statusCode ?? 200,
        response: this.transformData(data),
        timestamp: new Date().toISOString(),
        requestId,
      })),
    );
  }

  private transformData(data: any) {
    if (typeof data === 'object' && Array.isArray(data)) {
      return {
        data,
        total: data.length,
      };
    }
    return data;
  }
}
