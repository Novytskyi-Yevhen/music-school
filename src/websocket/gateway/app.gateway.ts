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
import { Chat } from 'src/shared/entity';
import { UserService } from 'src/users/providers';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
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
  ) {
    const newMessage = await this.messageService.create({
      user: {id: userId},
      text: message,
      chat: { id: chatId },
    });
    this.server.emit('newMessage', newMessage);
    return newMessage;
  }

  @SubscribeMessage('getMessages')
  async getMessages(@MessageBody('chatId') chatId: string) {
    const data = await this.chatService.findOneById(chatId);    
    return data.messages;
  }

  @SubscribeMessage('getChats')
  async getChats(@MessageBody('userId') userId) {
    const data = await this.userService.findOneById(userId);
    return await data.chats;    
  }

  @SubscribeMessage('getGeneralChatId')
  async getGeneralChatId() {
    return await this.chatService.getGeneralChatId();
  }

  @SubscribeMessage('getUsersId')
  async getUsersId(){
      return (await this.userService.findAll()).map(elem => elem.id);
  }

  afterInit(server: Server) {
    // когда он срабатывает?
    this.logger.log('Init');
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
