import { Injectable } from '@nestjs/common';
import arcjet, {
  ArcjetNodeRequest,
  detectBot,
  fixedWindow,
  shield,
} from '@arcjet/node';

@Injectable()
export class ArcjetHttpService {
  private readonly arjectMode = process.env.ARCJET_MODE ? 'DRY_RUN' : 'LIVE';

  private readonly arcjetHttp = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
      shield({ mode: this.arjectMode }),
      detectBot({
        mode: this.arjectMode,
        allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW', 'POSTMAN'],
      }),
      fixedWindow({
        mode: this.arjectMode,
        max: 50,
        window: '10s',
      }),
    ],
  });

  async protect(request: ArcjetNodeRequest) {
    return this.arcjetHttp.protect(request);
  }
}
