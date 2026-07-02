import { Global, Module } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { ApiTokenService } from '../lib/api-token/api-token.service.js';
import { UserTokenService } from '../user-token/user-token.service.js';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRES_IN as any },
        };
      },
    }),
  ],
  providers: [UserService, AuthService, ApiTokenService, UserTokenService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
