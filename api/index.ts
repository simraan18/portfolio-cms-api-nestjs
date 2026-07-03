import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.js';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export default async function handler(req, res) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();

  app.setGlobalPrefix('/api/v1');

  const { SwaggerModule, DocumentBuilder } = await import('@nestjs/swagger');

  const config = new DocumentBuilder()
    .setTitle('Portfolio CMS API')
    .setDescription('SK Portfolio Content Managment System API')
    .setVersion('1.0')
    .addServer('/api/v1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, { useGlobalPrefix: true });

  await app.init();

  server(req, res);
}
