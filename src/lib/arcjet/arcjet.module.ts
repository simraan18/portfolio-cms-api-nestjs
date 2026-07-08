import { Module } from '@nestjs/common';
import { ArcjetHttpService } from './arcjet-http.service.js';
import { ArcjetWSService } from './arcjet-ws.service.js';

@Module({
  providers: [ArcjetHttpService, ArcjetWSService],
  exports: [ArcjetHttpService, ArcjetWSService],
})
export class ArcjetModule {}
