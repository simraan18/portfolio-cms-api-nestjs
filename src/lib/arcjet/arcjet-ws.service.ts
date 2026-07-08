import { Injectable } from '@nestjs/common';
import arcjet, {
  ArcjetNodeRequest,
  detectBot,
  fixedWindow,
  shield,
} from '@arcjet/node';

@Injectable()
export class ArcjetWSService {
  private readonly arjectMode = process.env.ARCJET_MODE ? 'DRY_RUN' : 'LIVE';

  private readonly arcjetWS = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
      shield({ mode: this.arjectMode }),
      detectBot({
        mode: this.arjectMode,
        allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
      }),
      fixedWindow({
        mode: this.arjectMode,
        max: 5,
        window: '2s',
      }),
    ],
  });

  async protect(request: ArcjetNodeRequest) {
    return this.arcjetWS.protect(request);
  }
}
