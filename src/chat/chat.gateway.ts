import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CustomSocket } from './auth.adapter';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(socket: CustomSocket) {
    console.log(socket.user);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(@ConnectedSocket() socket: CustomSocket) {
    const forwardedId = parseInt(socket.handshake.query.forwardedId as string);
    const userId = socket.user.id;

    await this.chatService.joinRoom(forwardedId, userId);
  }

  @SubscribeMessage('incomeMessageListener')
  incomeMessageListener(
    @MessageBody() message: string,
    @ConnectedSocket() socket: CustomSocket,
  ) {
    const userId = socket.user.id;
  }

  handleDisconnect() {
    console.log('disconnected');
  }
}
