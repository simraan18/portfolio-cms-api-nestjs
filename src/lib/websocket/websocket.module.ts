import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway.js';
import { ArcjetModule } from '../arcjet/arcjet.module.js';

@Module({
  providers: [WebsocketGateway],
  imports: [ArcjetModule],
})
export class WebSocketModule {}
