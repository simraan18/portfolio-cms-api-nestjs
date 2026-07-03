import { Module } from '@nestjs/common';
import { ResponsibilityService } from './responsibility.service.js';
import { ResponsibilityController } from './responsibility.controller.js';

@Module({
  providers: [ResponsibilityService],
  controllers: [ResponsibilityController],
})
export class ResponsibilityModule {}
