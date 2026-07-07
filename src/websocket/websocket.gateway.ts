import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { LoggerService } from '../lib/logger/logger.service.js';

@WebSocketGateway({
  path: '/ws',
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(protected readonly logger: LoggerService) {}

  private clients = new Set<WebSocket>();

  afterInit(server: any) {
    this.logger.log('WebSocket initialized', { server });
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    this.logger.log('WebSocket connected');
    this.clients.add(client);
  }

  handleDisconnect(client: WebSocket) {
    this.logger.log('WebSocket disconnected');
    this.clients.delete(client);
    this.handleBroadcastFrontendVisit();
  }

  @SubscribeMessage('ping')
  handlePing(@MessageBody() body: any, @ConnectedSocket() client: WebSocket) {
    this.logger.log('WebSocket ping', { body });
    client.send(
      JSON.stringify({
        event: 'pong',
        data: 'pong',
      }),
    );
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
