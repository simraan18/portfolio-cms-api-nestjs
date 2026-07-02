import { Global, Module } from '@nestjs/common';
import { UserTokenService } from './user-token.service.js';

@Global()
@Module({
  providers: [UserTokenService],
  exports: [UserTokenService],
})
export class UserTokenModule {}
