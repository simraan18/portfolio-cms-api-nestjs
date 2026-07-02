import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ApiTokenService } from '../lib/api-token/api-token.service.js';
import { UserTokenModule } from '../user-token/user-token.module.js';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../Strategy/jwt/jwt.strategy.js';
import { UserTokenService } from '../user-token/user-token.service.js';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRES_IN as any },
        };
      },
    }),
    UserTokenModule,
    PassportModule,
  ],
  providers: [
    UserService,
    AuthService,
    ApiTokenService,
    JwtStrategy,
    UserTokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
