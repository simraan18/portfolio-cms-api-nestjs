import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger/logger.middleware.js';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './lib/database/prisma.module.js';
import { UserTokenModule } from './user-token/user-token.module.js';
import { ApiTokenModule } from './lib/api-token/api-token.module.js';
import { LoggerModule } from './lib/logger/logger.module.js';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    UserTokenModule,
    ApiTokenModule,
    LoggerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
