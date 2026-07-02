import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

import { ResponseTransformInterceptor } from './interceptor/response-transform/response-transform.interceptor.js';
import { ValidationPipe } from '@nestjs/common';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
