import { Module } from '@nestjs/common';
import { ApiTokenService } from './api-token.service.js';

@Module({
  providers: [ApiTokenService],
  exports: [ApiTokenService],
})
export class ApiTokenModule {}
