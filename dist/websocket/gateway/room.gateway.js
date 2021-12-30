"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const providers_1 = require("../../chat/providers");
const providers_2 = require("../../message/providers");
const providers_3 = require("../../users/providers");
let RoomGateway = class RoomGateway {
    constructor(userService, chatService, messageService) {
        this.userService = userService;
        this.chatService = chatService;
        this.messageService = messageService;
        this.logger = new common_1.Logger('WEBSOCKET');
    }
    async newMessage(message, userId, chatId, socket) {
        const newMessage = await this.messageService.create({
            user: { id: userId },
            text: message,
            chat: { id: chatId },
        });
        socket.to(`${chatId}`).emit('newMessage', { message: newMessage });
        return newMessage;
    }
    async getMessages(chatId) {
        if (typeof chatId === 'string') {
            const data = await this.chatService.findOneById(chatId);
            return data.messages;
        }
        else {
            const chatsId = chatId.map(elem => elem.id);
            return await this.chatService.getUserChats(chatsId);
        }
    }
    async getChats(userId) {
        const data = await this.userService.findOneById(userId);
        return await data.chats;
    }
    async createRoom(usersId, socket) {
        const chat = await this.chatService.create({
            users: usersId,
            name: usersId.join(''),
        });
        socket.join(`${chat.id}`);
        socket.to(`${chat.id}`).emit('RoomCreated', { room: `${chat.id}` });
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(socket) {
        this.logger.log(`Client disconnected: ${socket.id}`);
    }
    async handleConnection(socket, userId) {
        const chats = await this.getChats(userId);
        chats.forEach((elem) => {
            socket.join(`${elem.id}`);
        });
        this.logger.log(`Client connected: ${socket.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RoomGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('newMessage'),
    __param(0, (0, websockets_1.MessageBody)('message')),
    __param(1, (0, websockets_1.MessageBody)('userId')),
    __param(2, (0, websockets_1.MessageBody)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "newMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getMessages'),
    __param(0, (0, websockets_1.MessageBody)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "getMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getChats'),
    __param(0, (0, websockets_1.MessageBody)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "getChats", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __param(0, (0, websockets_1.MessageBody)('usersId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "createRoom", null);
__decorate([
    __param(1, (0, websockets_1.MessageBody)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "handleConnection", null);
RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [providers_3.UserService,
        providers_1.ChatService,
        providers_2.MessageService])
], RoomGateway);
exports.RoomGateway = RoomGateway;
//# sourceMappingURL=room.gateway.js.map