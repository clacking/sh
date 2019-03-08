import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';

/*
 * for bridge between device connection and browsers.
 * probably lazy way because this array.
 */
@WebSocketGateway()
export class WsgateGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  // s t a t i c
  static clients = [];

  handleConnection(sock) {
    WsgateGateway.clients.push(sock);
  }

  handleDisconnect(sock) {
    WsgateGateway.clients = WsgateGateway.clients.filter(client => client.id !== sock.id);
  }

  static sendData(event: string, data: number) {
    WsgateGateway.clients.forEach(sock => {
      sock.emit(event, data);
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
