import { Module } from '@nestjs/common';
import { SocialLinkService } from './social-link.service.js';
import { SocialLinkController } from './social-link.controller.js';

@Module({
  providers: [SocialLinkService],
  controllers: [SocialLinkController],
})
export class SocialLinkModule {}
