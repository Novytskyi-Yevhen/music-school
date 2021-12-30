import { Logger } from '@nestjs/common';
import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/providers';
import { MessageService } from 'src/message/providers';
import { UserService } from 'src/users/providers';
export declare class RoomGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private userService;
    private chatService;
    private messageService;
    server: Server;
    logger: Logger;
    constructor(userService: UserService, chatService: ChatService, messageService: MessageService);
    newMessage(message: string, userId: string, chatId: string, socket: Socket): Promise<import("../../shared/entity").Message>;
    getMessages(chatId: string | {
        id: string;
    }[]): Promise<import("../../shared/entity").Chat[] | import("../../shared/entity").Message[]>;
    getChats(userId: string): Promise<import("../../shared/entity").Chat[]>;
    createRoom(usersId: {
        id: string;
    }[], socket: Socket): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(socket: Socket): void;
    handleConnection(socket: Socket, userId: string): Promise<void>;
}
