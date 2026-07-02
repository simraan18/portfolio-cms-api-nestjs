import { Global, Module } from '@nestjs/common';
import { ApiTokenService } from './api-token.service.js';

@Global()
@Module({
  providers: [ApiTokenService],
  exports: [ApiTokenService],
})
export class ApiTokenModule {}
