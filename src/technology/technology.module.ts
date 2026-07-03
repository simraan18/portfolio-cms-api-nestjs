import { Module } from '@nestjs/common';
import { TechnologyService } from './technology.service.js';
import { TechnologyController } from './technology.controller.js';

@Module({
  providers: [TechnologyService],
  controllers: [TechnologyController],
})
export class TechnologyModule {}
