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
exports.ChatService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const service_1 = require("../../shared/service");
const typeorm_2 = require("typeorm");
const entity_1 = require("../../shared/entity");
let ChatService = class ChatService extends service_1.GenericService {
    constructor(chatRepository) {
        super(chatRepository);
        this.chatRepository = chatRepository;
    }
    async getGeneralChatId() {
        return await (await this.chatRepository.findOne({ where: { name: 'GeneralChat' }, select: ['id'] })).id;
    }
    async getUserChats(chatsId) {
        return await this.chatRepository.find({ where: { id: (0, typeorm_2.In)(chatsId) } });
    }
};
ChatService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(entity_1.Chat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map