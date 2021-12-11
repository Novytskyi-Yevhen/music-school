import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/providers';
import { MessageService } from 'src/message/providers';
import { UserService } from 'src/users/providers';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  logger: Logger = new Logger('WEBSOCKET');
  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private messageService: MessageService,
  ) {}

  @SubscribeMessage('newMessage')
  async newMessage(
    @MessageBody('message') message: string,
    @MessageBody('userId') userId: string,
    @MessageBody('chatId') chatId: string,
    socket: Socket,
  ) {
    const newMessage = await this.messageService.create({
      user: { id: userId },
      text: message,
      chat: { id: chatId },
    });
    socket.to(`${chatId}`).emit('newMessage', { message: newMessage });
    return newMessage;
  }

  @SubscribeMessage('getMessages')
  async getMessages(@MessageBody('chatId') chatId: string | { id: string }[]) {
    if (typeof chatId === 'string') {
      const data = await this.chatService.findOneById(chatId);
      return data.messages;
    } else {
      const chatsId = chatId.map(elem => elem.id);
      return await this.chatService.getUserChats(chatsId);
    }
  }

  @SubscribeMessage('getChats')
  async getChats(@MessageBody('userId') userId: string) {
    const data = await this.userService.findOneById(userId);
    return await data.chats;
  }

  @SubscribeMessage('createRoom')
  async createRoom(
    @MessageBody('usersId') usersId: { id: string }[],
    socket: Socket,
  ) {
    const chat = await this.chatService.create({
      users: usersId,
      name: usersId.join(''),
    });
    socket.join(`${chat.id}`);
    socket.to(`${chat.id}`).emit('RoomCreated', { room: `${chat.id}` });
  }

  afterInit(server: Server) {
    // когда он срабатывает?
    this.logger.log('Init');
  }
  handleDisconnect(socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  async handleConnection(
    socket: Socket,
    @MessageBody('userId') userId: string,
  ) {
    const chats = await this.getChats(userId);
    chats.forEach((elem) => {
      socket.join(`${elem.id}`);
    });
    this.logger.log(`Client connected: ${socket.id}`);
  }
}
