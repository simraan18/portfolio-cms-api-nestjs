import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignUpDto, SignInDto } from '../dto/auth.dto.js';
import { JwtAuthGuard } from '../Strategy/jwt/jwt-auth.guard.js';
import { Public } from '../decorator/is-public.js';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  @ApiOperation({ summary: 'User sign up' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(
      signUpDto.name,
      signUpDto.email,
      signUpDto.password,
    );
  }

  @Public()
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User sign in' })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiBearerAuth('access-token')
  async getUserById(@Req() req: any) {
    return await this.authService.getUserById(req.user.userId);
  }

  @Post('/sign-out')
  @ApiOperation({ summary: 'Sign Out' })
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  async signOut(@Req() req: any) {
    return await this.authService.signOut(req.user.userId);
  }
}
