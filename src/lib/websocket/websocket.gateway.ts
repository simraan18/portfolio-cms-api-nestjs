import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { LoggerService } from '../logger/logger.service.js';
import { WebSocket } from 'ws';
import { ArcjetWSService } from '../arcjet/arcjet-ws.service.js';
import { IncomingMessage } from 'http';
import { ArcjetNodeRequest } from '@arcjet/node';

declare module 'ws' {
  interface WebSocket {
    isAlive: boolean;
  }
}

@WebSocketGateway({
  path: '/ws',
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private clients = new Set<WebSocket>();
  private interval: NodeJS.Timeout | null = null;

  constructor(
    protected readonly logger: LoggerService,
    private readonly arcjetWsService: ArcjetWSService,
  ) {
    this.interval = setInterval(() => {
      for (const client of this.clients) {
        if (!client.isAlive) {
          client.terminate();
          this.clients.delete(client);
          this.logger.log('WebSocket client terminated');
          continue;
        }
        client.isAlive = false;
        client.ping();
      }
    }, 30000);
  }

  afterInit(server: any) {
    this.logger.log('WebSocket initialized', { server });
  }

  async handleConnection(client: WebSocket, request: IncomingMessage) {
    const arcjectNodeRequest: ArcjetNodeRequest = {
      ...request,
    };
    const decision = await this.arcjetWsService.protect(arcjectNodeRequest);
    if (decision.isDenied()) {
      this.logger.error('ArcjetWSService Denied', { reason: decision.reason });
      client.close(1008, decision.reason.type || 'Connection rejected');
      return;
    }
    this.logger.log('WebSocket connected');
    client.isAlive = true;
    client.on('pong', () => {
      this.logger.log('Client pong');
      client.isAlive = true;
    });
    this.clients.add(client);
  }

  handleDisconnect(client: WebSocket) {
    this.logger.log('WebSocket disconnected');
    this.handleBroadcastFrontendVisit();
  }

  @SubscribeMessage('broadcast-frontend-visit')
  async handleBroadcastFrontendVisit() {
    this.logger.log('WebSocket broadcast-frontend-visit');
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: 'broadcast-frontend-visit',
            visitCount: this.clients.size.toString(),
          }),
        );
      }
    });
  }
}
