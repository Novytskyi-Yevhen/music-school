import { AbstractCRUDController } from 'src/shared/controllers';
import { Chat } from 'src/shared/entity';
import { ChatDTO } from '../DTO';
import { ChatService } from '../providers';
export declare class ChatController extends AbstractCRUDController<ChatDTO, Chat, ChatService> {
    private chatService;
    constructor(chatService: ChatService);
}
