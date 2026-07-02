import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CryptoJS from 'crypto-js';
import { UserTokenService } from '../../user-token/user-token.service.js';
import { randomBytes } from 'crypto';

@Injectable()
export class ApiTokenService {
  async generateToken(jwt: string) {
    const { key, encryptedToken } = await this.encryptToken(jwt);
    return {
      key,
      hashedToken: encryptedToken,
    };
  }

  async verifyToken(key: string, userToken: any) {
    if (!userToken) return null;
    const decryptedToken = CryptoJS.AES.decrypt(
      userToken.hashedToken,
      key,
    ).toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  }

  private async encryptToken(token: string) {
    const secretKey = randomBytes(32).toString('hex');
    const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
    return {
      key: secretKey,
      encryptedToken,
    };
  }
}
