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
import { JoinRoomDto } from './dto';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

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

  @UsePipes(new ValidationPipe()) // Check DTO
  @SubscribeMessage('joinRoom')
  async joinRoom(
    @ConnectedSocket() socket: CustomSocket,
    @MessageBody() message: JoinRoomDto,
  ) {
    const userId = socket.user.id;
    const roomId = String(message.roomId); // Cascade to string

    socket.join(roomId);

    console.log(socket.rooms); // Set(2) { 'aqsgHhgsqiVVawb7AAAB', '1' }
  }

  @SubscribeMessage('sendMessage')
  sendMessage(
    @MessageBody() message: string,
    @ConnectedSocket() socket: CustomSocket,
  ) {
    const userId = socket.user.id;
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
