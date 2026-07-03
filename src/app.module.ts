import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger/logger.middleware.js';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './lib/database/prisma.module.js';
import { UserTokenModule } from './user-token/user-token.module.js';
import { ApiTokenModule } from './lib/api-token/api-token.module.js';
import { LoggerModule } from './lib/logger/logger.module.js';
import { CardCategoryModule } from './card-category/card-category.module.js';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './global-exception-filter.js';
import { ExperienceModule } from './experience/experience.module.js';
import { ResponsibilityModule } from './responsibility/responsibility.module.js';
import { TechnologyModule } from './technology/technology.module.js';
import { SocialLinkModule } from './social-link/social-link.module.js';
import { ProfileModule } from './profile/profile.module.js';
import { CardModule } from './card/card.module.js';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    UserTokenModule,
    ApiTokenModule,
    LoggerModule,
    CardCategoryModule,
    ExperienceModule,
    ResponsibilityModule,
    TechnologyModule,
    SocialLinkModule,
    ProfileModule,
    CardModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
