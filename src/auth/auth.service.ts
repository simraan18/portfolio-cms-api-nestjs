import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import * as bcrypt from 'bcrypt';
import { ApiTokenService } from '../lib/api-token/api-token.service.js';
import { UserTokenService } from '../user-token/user-token.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly apiTokenService: ApiTokenService,
    private readonly userTokenService: UserTokenService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(name: string, email: string, password: string) {
    const exitsUser = await this.userService.getUserByEmail(email);
    if (exitsUser) {
      throw new UnprocessableEntityException('Authentication failed');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.createUser(
      name,
      email,
      hashedPassword,
    );

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnprocessableEntityException('Authentication failed');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnprocessableEntityException('Authentication failed');
    }
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    const { key, hashedToken } =
      await this.apiTokenService.generateToken(token);
    const exitsUserToken = await this.userTokenService.getUserTokenByUserId(
      user.id,
    );
    if (exitsUserToken) {
      await this.userTokenService.deleteToken(user.id);
    }
    await this.userTokenService.createUserToken(user.id, hashedToken);
    return { access_token: `${user.id}.${key}` };
  }

  async getUserById(id: string) {
    const user = await this.userService.getUserById(id);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
