import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { LoggerService } from '../logger/logger.service.js';
import { WebSocket } from 'ws';

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

  constructor(protected readonly logger: LoggerService) {
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

  handleConnection(client: WebSocket, ...args: any[]) {
    this.logger.log('WebSocket connected');
    client.isAlive = true;
    client.on('pong', () => {
      this.logger.log('WebSocket pong');
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
